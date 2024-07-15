from flask import Flask, request, jsonify, render_template
import cv2
import numpy as np
import os
import json
from ImageProcessor import ImageProcessor
from flask_cors import CORS
import logging
from werkzeug.exceptions import InternalServerError
import traceback

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})

# Define the folder where images will be saved
IMAGE_FOLDER = 'static'
# Ensure the folder exists
os.makedirs(IMAGE_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.lower().endswith('.png'):
        img = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(img, cv2.IMREAD_COLOR)
        
        # Generate a unique filename and save the image to the specified folder
        image_filename = 'uploaded_image.png'
        saved_image_path = os.path.join(IMAGE_FOLDER, image_filename)
        cv2.imwrite(saved_image_path, img)
        
        data = main(saved_image_path)
        return jsonify(data)
    else:
        return jsonify({"error": "Invalid file type. Please upload a PNG image."}), 400

def main(img_path):
    image = ImageProcessor(img_path)
    image.preprocess_image()
    all_data = image.get_rect_data()
    file_path = 'static/rectangles.json'
    with open(file_path, 'w') as f:
        json.dump(all_data, f, indent=2)
    return all_data

if __name__ == '__main__':
    app.run(debug=True)