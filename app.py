from flask import Flask, request, jsonify
import base64
import requests
from flask_cors import CORS
import logging
import json

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

# Replace with your actual Plant.id API key
PLANT_ID_API_KEY = "aPW9EcUn9qjZHgrkYbgX5nIoOUik68fYzHRlclYJ0h3jMci6sF"
PLANT_ID_API_URL = "https://plant.id/api/v3/identify"
@app.route('/identify', methods=['POST'])
def identify_plant():
    try:
        image_data = request.files['image'].read()
        base64_image = base64.b64encode(image_data).decode('utf-8')

        payload = {
            "images": [base64_image],
            "plant_details": ["common_names", "url", "wiki_description"]
        }

        headers = {
            "Content-Type": "application/json",
            "Api-Key": "aPW9EcUn9qjZHgrkYbgX5nIoOUik68fYzHRlclYJ0h3jMci6sF"
        }

        logging.info(f"Sending payload to Plant.id: {payload}")
        response = requests.post(PLANT_ID_API_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes

        result = response.json()
        logging.info(f"Received response from Plant.id: {json.dumps(result)}")

        # Extract relevant information from the result
        best_match = result.get('suggestions', [])[0] # Use .get() to avoid KeyError
        plant_name = best_match.get('plant_name', 'Name not found')
        plant_description = best_match.get('plant_details', {}).get('wiki_description', {}).get('value', 'Description not available.')

        return jsonify({"plant_name": plant_name, "plant_description": plant_description})

    except requests.exceptions.RequestException as e:
        logging.error(f"Error calling Plant.id API: {e}")
        return jsonify({"error": f"Error calling Plant.id API: {e}"}), 500
    except Exception as e:
        logging.error(f"Error processing request: {e}", exc_info=True)
        return jsonify({"error": f"Error processing request: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)