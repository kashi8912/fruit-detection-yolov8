"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Apple, ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DetectPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [img64,setimg64]=useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{ name: string; confidence: number }[]>([]);
  const [pdf,setpdf]=useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const analyzeImage = () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(async() => {
      // Mock result - in a real app, this would come from your API

      // Randomly select a fruit from our mock data
      const formdata=new FormData();
      formdata.append("file",file);
      try{
        const response=await fetch('http://localhost:8080/predict',{
          method:'POST',
          body:formdata,
        });
        const data=await response.json();
        const img64=`data:image/png;base64,${data.image}`;
        setpdf(data.report_id);
        setimg64(img64);
        setResult(data.classes_detected);
      }catch(e){
        console.log(e);
      }
      setIsAnalyzing(false)
    }, 2000)
  }

  const resetDetection = () => {
    setFile(null)
    setPreview(null)
    setResult([])
  }
  const previewPDF = (reportId: string) => {
    window.open(`http://localhost:8080/download/${reportId}`, '_blank');
  };
  
  
  
  

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Apple className="h-6 w-6 text-green-500" />
            <span>FruitDetect</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-full space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fruit Detection</h1>
              <p className="text-gray-500 md:text-xl">
                Upload an image of a fruit and our AI will identify it for you.
              </p>
            </div>

            {result.length<1 ? (
              <div className="space-y-6 max-w-full">
                <div
                  className="max-w-3xl m-auto border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  {preview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-[300px] max-w-full rounded-lg mb-4"
                      />
                      <p className="text-sm text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">Drag and drop your fruit image here or click to browse</p>
                      <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, JPEG(max 10MB)</p>
                    </div>
                  )}
                  <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                {isAnalyzing ? (
                  <div className="space-y-4">
                    <p className="text-center font-medium">Analyzing your fruit...</p>
                    <Progress value={45} className="h-2" />
                  </div>
                ) : (
                  file && (
                    <Button onClick={analyzeImage} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      Analyze Image
                    </Button>
                  )
                )}
              </div>
            ) : (
              <div className="space-y-6 max-w-full">
                <div className="flex gap-6">
                  <div className="w-3/5">
                      <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="aspect-square overflow-hidden rounded-lg mb-4">
                        <img
                          src={img64??undefined}
                          alt="Uploaded fruit"
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Uploaded Image</p>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                
                  <div className="w-2/5 h-fit gap-5 grid grid-cols-2">
                    {result.length > 0 ? (
                    result.map((results, index) => (
                      <Card key={index} className="h-fit w-fit">
                        <CardContent className="p-6">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-center">Detected Fruit #{index + 1}</h2>
                            <div className="text-center text-lg font-semibold text-purple-700">{results.name}</div>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm font-medium">Confidence:</span>
                              <span className="text-sm text-green-600 font-bold">
                                {(results.confidence * 100).toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No fruits detected yet.</div>
                  )}

                  </div>
                  
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={resetDetection}>
                    Detect Another Fruit
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={()=>previewPDF(pdf)}>Save Results</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container py-6 text-center text-sm text-gray-500 px-4 md:px-6">
          <p>© 2023 FruitDetect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
