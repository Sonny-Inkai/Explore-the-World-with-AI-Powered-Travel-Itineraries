from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
MONGODB_ATLAS_CLUSTER_URI = 'mongodb+srv://sonny:27062002147sonny@cluster0.aceuk.mongodb.net/'
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
        days = int(data.get('days'))  # Ensure days is converted to an integer
        budget = data.get('budget')  # Leave budget as string if it's categorical
        companions = data.get('companions')  # Leave companions as string if it's categorical
        description = data.get('description', '')

        prompt = "Find the best travel destinations with the following criteria:"
        query = f"{prompt} Location: {location}, Description: {description}, Days: {days}, Budget: {budget}, Companions: {companions}"

        hotels = full_text_search(query, category='hotel', limit=6)
        restaurants = full_text_search(query, category='restaurant', limit=days+5)
        attractions = full_text_search(query, category='attraction', limit=days+5)

        combined_results = {
            'hotels': convert_to_json_serializable(hotels),
            'restaurants': convert_to_json_serializable(restaurants),
            'attractions': convert_to_json_serializable(attractions)
        }

        return jsonify(combined_results)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)