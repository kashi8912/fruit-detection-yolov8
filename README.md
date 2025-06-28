# 🍎 Fruit Detection and Classification using YOLOv8m

This project is a full-stack fruit detection application that uses **YOLOv8m** for fruit classification and bounding box detection. Users can upload fruit images, detect fruits like mango, apple, banana, orange, and strawberry, and classify them as **fresh** or **rotten**. Results are displayed on the frontend and can be saved as a **PDF report** including detection coordinates.

---

## 🚀 Features

- 🧠 YOLOv8m-based object detection
- 🍓 Detect & classify fruits as **fresh** or **rotten**
- 📤 Upload images via frontend
- 📄 Export results as **PDF** with bounding box coordinates
- 🔗 Uses Roboflow for image annotation
- ⚡ Backend built with Flask
- 🌐 Frontend built with Next.js

---

## 📸 Fruits Detected

- 🍎 Apple  
- 🍌 Banana  
- 🥭 Mango  
- 🍊 Orange  
- 🍓 Strawberry  

Each fruit is classified into:
- ✅ Fresh  
- ❌ Rotten  

---

## 🧪 Tech Stack

- **Model**: YOLOv8m (Ultralytics)
- **Annotation**: Roboflow
- **Frontend**: Next.js (React-based)
- **Backend**: Flask (Python)
- **PDF Generation**: Python libraries like `fpdf` or `reportlab`

---

## 🛠️ Installation

### 📦 Backend (Flask)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

---

### 🌐 Frontend (Next.js)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## 🧠 Model File

Download the trained YOLOv8m model (`best.pt`) from the link below and place it inside the `model` folder in the backend:

🔗 **[Download YOLOv8m Model from Google Drive](https://drive.google.com/drive/folders/18hKYGwXA-Q4SHEpfrvCtiTH3qWy5hMfe?usp=drive_link)**  


---

## 📄 Example Output

The application generates a PDF containing:
- Detected fruit names and freshness status
- Confidence scores
- Bounding box coordinates (x, y, width, height)

These PDFs are saved automatically in the `/results` folder after each detection.

---

## 📁 Project Structure

```
Fruit-Detection-Project/
├── backend/
│   ├── app.py
│   ├── model/
│   │   └── best.pt
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── pages/
│   ├── components/
│   └── ...
├── README.md
```

---

## 📝 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute.

---

## 🙌 Contributions

PRs and suggestions are welcome. If you find a bug or want to add a feature, feel free to open an issue or submit a pull request!

---

## 📬 Contact

Feel free to reach out with questions or feedback.
