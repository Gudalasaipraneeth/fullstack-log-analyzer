from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from parser import parse_log_file

app = Flask(__name__)
CORS(app)  # Enable CORS

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    parsed_data = parse_log_file(filepath)
    return jsonify(parsed_data)

if __name__ == '__main__':
    app.run(debug=True)
