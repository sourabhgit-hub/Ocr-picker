from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import cv2
import numpy as np
import os
import json
from ImageProcessor import ImageProcessor

app = Flask(__name__)
# CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/*": {"origins": "*"}})

# Define the folder where images will be saved
IMAGE_FOLDER = 'static'

# Ensure the folder exists
os.makedirs(IMAGE_FOLDER, exist_ok=True)

@app.route('/', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    
    # Generate a unique filename and save the image to the specified folder
    image_filename = 'uploaded_image.jpg'
    saved_image_path = os.path.join(IMAGE_FOLDER, image_filename)
    cv2.imwrite(saved_image_path, img)
    
    data = main(saved_image_path)

    return jsonify({"message": "Image processed successfully"}), 200

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

def main(img_path):
    image = ImageProcessor(img_path)
    image.preprocess_image()
    all_data = image.get_rect_data()
    file_path = os.path.join(IMAGE_FOLDER, 'rectangles.json')
    with open(file_path, 'w') as f:
        json.dump(all_data, f, indent=2)

    return all_data

@app.route('/output', methods=['POST'])
def receive_data():
  try:
    data = request.get_json()
    # Process the received data (e.g., store it in a database)
    return jsonify({'message': 'Data received successfully!'}), 200
  except Exception as e:
    return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)