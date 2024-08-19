from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
MONGODB_ATLAS_CLUSTER_URI = os.getenv('MONGODB_ATLAS_CLUSTER_URI', 'mongodb+srv://sonny:27062002147sonny@cluster0.aceuk.mongodb.net/')
client = MongoClient(MONGODB_ATLAS_CLUSTER_URI)

# Database and collection
DB_NAME = "trip"
COLLECTION_NAME = "trip_data"
db_collection = client[DB_NAME][COLLECTION_NAME]

def full_text_search(query, category, limit):
    pipeline = [
        {
            '$search': {
                'index': 'default',
                'text': {
                    'query': query,
                    'path': ['description', 'type', 'rating']
                }
            }
        },
        {
            '$match': {
                'category': category,
                'image': {'$exists': True}
            }
        },
        {
            '$limit': limit 
        }
    ]
    results = list(db_collection.aggregate(pipeline))
    return results

def convert_to_json_serializable(results):
    for result in results:
        if '_id' in result:
            result['_id'] = str(result['_id'])
    return results

@app.route('/api/hybrid-search', methods=['POST'])
def hybrid_search():
    try:
        data = request.json
        location = data.get('location', '')
        days = int(data.get('days'))  
        budget = data.get('budget')  
        companions = data.get('companions')  
        description = data.get('description', '')

        prompt = "Find the best travel destinations with the following criteria:"
        query = f"{prompt} Location: {location}, Description: {description}, Days: {days}, Budget: {budget}, Companions: {companions}"

        hotels = full_text_search(query, category='hotel', limit=6)
        restaurants = full_text_search(query, category='restaurant', limit=days+3)
        attractions = full_text_search(query, category='attraction', limit=days+3)

        combined_results = {
            'hotels': convert_to_json_serializable(hotels),
            'restaurants': convert_to_json_serializable(restaurants),
            'attractions': convert_to_json_serializable(attractions)
        }

        # Convert combined_results to JSON string to pass to Node.js script
        combined_results_json = json.dumps(combined_results)

        # Call the Node.js script to rank the results
        # user_input = f"Location: {location}, Description: {description}, Days: {days}, Budget: {budget}, Companions: {companions}"
        node_script = 'solarLLM.js'
        ranked_results = subprocess.check_output(['node', node_script, query, combined_results_json], text=True)

        ranked_results_json = json.loads(ranked_results)

        return jsonify(ranked_results_json)

    except ValueError:
        return jsonify({"error": "Invalid input"}), 400
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)