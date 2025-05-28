import os
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from io import BytesIO
from utils import stylize_image
import logging

app = Flask(__name__)
CORS(app)

# Enable debug mode and logging
app.debug = True
logging.basicConfig(level=logging.DEBUG)

STYLE_MODELS = {
    "style1.jpg": "candy.pth",
    "style2.jpg": "mosaic.pth",
    "style3.jpg": "rain_princess.pth",
    "style4.jpg": "udnie.pth",
    "style5.jpg": "udnie.pth"
}

@app.route('/api/transfer', methods=['POST'])
def transfer():
    try:
        image = request.files.get('image')
        style = request.form.get('style')
        if not image or not style:
            app.logger.error(f"Missing image or style. image: {image}, style: {style}")
            return jsonify({'error': 'Missing image or style'}), 400

        model_filename = STYLE_MODELS.get(style)
        if not model_filename:
            app.logger.error(f"Unknown style: {style}")
            return jsonify({'error': f'Unknown style: {style}'}), 400

        stylized_bytes = stylize_image(image, os.path.join('models', model_filename))
        return send_file(BytesIO(stylized_bytes), mimetype='image/png')
    except Exception as e:
        app.logger.error(f"Error during style transfer: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
