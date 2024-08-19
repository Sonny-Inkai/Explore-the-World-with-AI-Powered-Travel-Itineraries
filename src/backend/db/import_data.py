from pymongo import MongoClient
from pymongo.server_api import ServerApi
import json

# Create a MongoDB client
client = MongoClient("mongodb+srv://sonny:27062002147sonny@cluster0.aceuk.mongodb.net/", server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

database_name = "trip"
collection_table1 = "trip_data"

db = client[database_name]
trip_table = db[collection_table1]

# Load data from JSON file with UTF-8 encoding
with open("../../../public/advisortrip.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Insert data into the collection
trip_table.insert_many(data)

print("Data successfully imported!")

