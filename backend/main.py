from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bson import ObjectId
from database import (
    leads_collection,
    customers_collection,
    opportunities_collection,
    proposals_collection,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Lead(BaseModel):
    leadName: str
    contactPerson: str
    email: str
    phone: str
    company: str
    service: str
    budget: str
    leadSource: str
    status: str
    assignedTo: str
    nextFollowUp: str
    notes: str


class Customer(BaseModel):
    customerName: str
    contactPerson: str
    email: str
    phone: str
    service: str
    totalValue: str
    status: str
    assignedTo: str
    notes: str


class Opportunity(BaseModel):
    opportunityName: str
    customer: str
    service: str
    value: float
    stage: str
    probability: float
    expectedRevenue: float
    expectedCloseDate: str
    assignedTo: str
    notes: str


class Proposal(BaseModel):
    proposalName: str
    customer: str
    opportunity: str
    service: str
    amount: float
    proposalDate: str
    validUntil: str
    status: str
    assignedTo: str
    notes: str


@app.get("/")
def home():
    return {"message": "Sales Management API is running"}


@app.post("/leads")
def create_lead(lead: Lead):

    lead_data = lead.model_dump()

    result = leads_collection.insert_one(lead_data)

    return {"message": "Lead saved successfully", "id": str(result.inserted_id)}


@app.get("/leads")
def get_leads():

    leads = list(leads_collection.find())

    for lead in leads:
        lead["_id"] = str(lead["_id"])

    return leads


@app.put("/leads/{lead_id}")
def update_lead(lead_id: str, lead: Lead):

    lead_data = lead.model_dump()

    result = leads_collection.update_one(
        {"_id": ObjectId(lead_id)}, {"$set": lead_data}
    )

    return {"message": "Lead updated successfully"}


@app.delete("/leads/{lead_id}")
def delete_lead(lead_id: str):

    result = leads_collection.delete_one({"_id": ObjectId(lead_id)})

    return {"message": "Lead deleted successfully"}


@app.post("/customers")
def create_customer(customer: Customer):
    customer_data = customer.model_dump()

    result = customers_collection.insert_one(customer_data)

    return {"message": "Customer saved successfully", "id": str(result.inserted_id)}


@app.get("/customers")
def get_customers():
    customers = list(customers_collection.find())

    for customer in customers:
        customer["_id"] = str(customer["_id"])

    return customers


@app.put("/customers/{customer_id}")
def update_customer(customer_id: str, customer: Customer):

    customer_data = customer.model_dump()

    result = customers_collection.update_one(
        {"_id": ObjectId(customer_id)}, {"$set": customer_data}
    )

    return {"message": "Customer updated successfully"}


@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: str):

    result = customers_collection.delete_one({"_id": ObjectId(customer_id)})

    return {"message": "Customer deleted successfully"}


@app.post("/opportunities")
def create_opportunity(opportunity: Opportunity):

    opportunity_data = opportunity.model_dump()

    result = opportunities_collection.insert_one(opportunity_data)

    return {"message": "Opportunity saved successfully", "id": str(result.inserted_id)}


@app.get("/opportunities")
def get_opportunities():

    opportunities = list(opportunities_collection.find())

    for opportunity in opportunities:
        opportunity["_id"] = str(opportunity["_id"])

    return opportunities


@app.put("/opportunities/{opportunity_id}")
def update_opportunity(opportunity_id: str, opportunity: Opportunity):

    opportunity_data = opportunity.model_dump()

    result = opportunities_collection.update_one(
        {"_id": ObjectId(opportunity_id)}, {"$set": opportunity_data}
    )

    return {"message": "Opportunity updated successfully"}


@app.delete("/opportunities/{opportunity_id}")
def delete_opportunity(opportunity_id: str):

    result = opportunities_collection.delete_one({"_id": ObjectId(opportunity_id)})

    return {"message": "Opportunity deleted successfully"}


@app.post("/proposals")
def create_proposal(proposal: Proposal):
    proposal_data = proposal.model_dump()

    result = proposals_collection.insert_one(proposal_data)

    return {
        "message": "Proposal saved successfully",
        "id": str(result.inserted_id),
    }


@app.get("/proposals")
def get_proposals():
    proposals = list(proposals_collection.find())

    for proposal in proposals:
        proposal["_id"] = str(proposal["_id"])

    return proposals


@app.put("/proposals/{proposal_id}")
def update_proposal(
    proposal_id: str,
    proposal: Proposal,
):

    proposal_data = proposal.model_dump()

    proposals_collection.update_one(
        {"_id": ObjectId(proposal_id)},
        {"$set": proposal_data},
    )

    return {"message": "Proposal updated successfully"}


@app.delete("/proposals/{proposal_id}")
def delete_proposal(proposal_id: str):
    
    proposals_collection.delete_one({"_id": ObjectId(proposal_id)})
   
    return {"message": "Proposal deleted successfully"}
