import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["sales_dashboard"]

leads_collection = db["leads"]

customers_collection = db["customers"]

opportunities_collection = db["opportunities"]

proposals_collection = db["proposals"]

print("MongoDB connected successfully")
