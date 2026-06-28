import numpy as np
import tensorflow as tf
import cv2
import base64
from utils import preprocess_image

def generate_gradcam(image_bytes, model):
    try:
        processed = preprocess_image(image_bytes)
        
        # Model call करून output fix करूया
        _ = model(processed)
        
        last_conv_layer = model.get_layer('vgg16').get_layer('block5_conv3')
        
        grad_model = tf.keras.models.Model(
            inputs=model.inputs,
            outputs=[last_conv_layer.output, model.output]
        )
        
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(processed)
            loss = predictions[:, 0]
        
        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)
        heatmap = heatmap.numpy()
        
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (224, 224))
        heatmap_resized = cv2.resize(heatmap, (224, 224))
        heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
        superimposed = cv2.addWeighted(img, 0.6, heatmap_colored, 0.4, 0)
        _, buffer = cv2.imencode('.jpg', superimposed)
        return base64.b64encode(buffer).decode('utf-8')
    except Exception as e:
        print(f"Gradcam error: {e}")
        return ""