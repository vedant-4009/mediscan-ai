from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from model import model, predict_image
from gradcam import generate_gradcam

app = FastAPI(title="MediScan AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "MediScan AI is running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = predict_image(image_bytes)
    heatmap = generate_gradcam(image_bytes, model)
    return {
        "diagnosis": result["diagnosis"],
        "confidence": result["confidence"],
        "heatmap": heatmap,
        "recommendation": (
            "Pneumonia detected. Please consult a doctor immediately."
            if result["diagnosis"] == "PNEUMONIA"
            else "No signs of Pneumonia detected. Stay healthy!"
        )
    }
