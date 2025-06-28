from flask import Flask, jsonify,request,send_file
from flask_cors import CORS
from PIL import Image
import io
from ultralytics import YOLO
import torch
import cv2
import numpy as np
import base64
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import uuid
import os



app=Flask(__name__)
CORS(app)
model=YOLO("../train5/weights/best.pt")

pdfs={}

@app.route("/predict", methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'}), 400
    
    file = request.files['file']
    image_pil = Image.open(file.stream).convert("RGB")
    image_np = np.array(image_pil)
    image_bgr = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

    results = model(image_pil,conf=0.7)
    boxes = results[0].boxes
    class_name = []
    cropped_images = []
    i = 0

    for idx, box in enumerate(boxes):
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cls_id = int(box.cls[0].item())
        cls_name = model.names[cls_id]
        conf = float(box.conf[0].item())
        class_name.append({'name': cls_name, 'confidence': conf, 'coordinates': [x1, y1, x2, y2]})
        cropped = image_pil.crop((x1, y1, x2, y2))
        cropped_images.append((f"{cls_name}_{idx+1}", cropped))

        cv2.rectangle(image_bgr, (x1, y1), (x2, y2), (0, 255, 0), thickness=1)
        label = f"#{i+1}"
        cv2.putText(image_bgr, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        i += 1

    # Convert annotated image to base64
    result_image = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    result_pil = Image.fromarray(result_image)
    image_io = io.BytesIO()
    result_pil.save(image_io, format='PNG')
    image_io.seek(0)
    img_base = base64.b64encode(image_io.read()).decode('utf-8')

    # Create PDF in memory
    pdf_buffer = io.BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 40, "Fruit Detection Report")

    # Annotated image
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 60, "Detected Objects in Image:")
    annotated_io = io.BytesIO()
    result_pil.save(annotated_io, format='PNG')
    annotated_io.seek(0)
    c.drawImage(ImageReader(annotated_io), 50, height - 350, width=300, height=250)

    y = height - 370

    # List all objects
    for idx, obj in enumerate(class_name):
        line = f"{idx+1}. {obj['name']} | Confidence: {round(obj['confidence'], 2)} | Coords: {obj['coordinates']}"
        c.drawString(50, y, line)
        y -= 20
        if y < 100:
            c.showPage()
            y = height - 50

    # Cropped images
    if y < 300:
        c.showPage()
        y = height - 50
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Cropped Detections:")
    y -= 30
    for name, crop_img in cropped_images:
        crop_io = io.BytesIO()
        crop_img.save(crop_io, format='PNG')
        crop_io.seek(0)

        # Draw image
        c.drawImage(ImageReader(crop_io), 50, y - 100, width=100, height=100)

        # Draw name
        c.setFont("Helvetica", 12)
        c.drawString(160, y - 30, name)

        # Find matching coordinates
        matched_obj = next((obj for obj in class_name if obj['name'] in name), None)
        if matched_obj:
            coords = matched_obj['coordinates']
            coords_text = f"(x1:{coords[0]}, y1:{coords[1]})  :  (x2:{coords[2]},y2:{coords[3]})"
            c.drawString(160, y - 50, coords_text)

        y -= 120
        if y < 120:
            c.showPage()
            y = height - 50


    c.save()
    pdf_buffer.seek(0)
    pdf_base64 = base64.b64encode(pdf_buffer.read()).decode('utf-8')
    report_id = uuid.uuid4().hex
    pdfs[report_id]=pdf_base64
    return jsonify({
        'classes_detected': class_name,
        'image': img_base,
        'report_id': report_id
    })
@app.route("/download/<report_id>", methods=['GET'])
def download_pdf(report_id):
    pdf_base64 = pdfs.get(report_id)
    if not pdf_base64:
        return jsonify({'error': 'Report not found'}), 404

    pdf_bytes = base64.b64decode(pdf_base64)
    pdf_io = io.BytesIO(pdf_bytes)
    pdf_io.seek(0)

    # Optionally delete after download
    #del pdfs[report_id]

    return send_file(
        pdf_io,
        mimetype='application/pdf',
        as_attachment=False,
    )

@app.route("/api/home",methods=['GET'])
def return_home():
    return jsonify({
        'message':"Hello World!"
    })

if __name__=='__main__':
    app.run(debug=True,port=8080)