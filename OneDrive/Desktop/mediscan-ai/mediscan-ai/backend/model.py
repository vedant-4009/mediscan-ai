import tensorflow as tf
import numpy as np
from utils import preprocess_image
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'mediscan_model.h5')

model = tf.keras.models.load_model(MODEL_PATH)

CLASSES = ['NORMAL', 'PNEUMONIA']

def predict_image(image_bytes):
    processed = preprocess_image(image_bytes)
    prediction = model.predict(processed)
    confidence = float(prediction[0][0])
    if confidence > 0.5:
        label = 'PNEUMONIA'
        confidence_score = confidence * 100
    else:
        label = 'NORMAL'
        confidence_score = (1 - confidence) * 100
    return {
        "diagnosis": label,
        "confidence": round(confidence_score, 2)
    }
