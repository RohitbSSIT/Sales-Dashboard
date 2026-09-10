import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["sales_dashboard"]

leads_collection = db["leads"]

customers_collection = db["customers"]

print("MongoDB connected successfully")
