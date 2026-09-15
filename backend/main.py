from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bson import ObjectId
from database import (
    leads_collection,
    customers_collection,
    opportunities_collection,
    proposals_collection,
    sales_collection,
    tasks_collection,
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

    converted: bool = False
    convertedCustomerId: str | None = None


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


class Sale(BaseModel):
    saleName: str
    customer: str
    opportunity: str
    proposal: str
    service: str
    saleAmount: float
    saleDate: str
    paymentStatus: str
    paymentMethod: str
    assignedTo: str
    notes: str
    amountPaid: float
    remainingAmount: float


class Task(BaseModel):
    taskTitle: str
    description: str
    customer: str
    opportunity: str
    assignedTo: str
    priority: str
    dueDate: str
    status: str
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


@app.post("/leads/{lead_id}/convert")
def convert_lead(lead_id: str):

    # 1. Find the lead
    lead = leads_collection.find_one({
        "_id": ObjectId(lead_id)
    })

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    # 2. Check if already converted
    if lead.get("converted", False):
        raise HTTPException(
            status_code=400,
            detail="Lead is already converted"
        )

    # 3. Create customer using lead information
    customer_data = {
        "customerName": lead["company"],
        "contactPerson": lead["contactPerson"],
        "email": lead["email"],
        "phone": lead["phone"],
        "service": lead["service"],
        "status": "active",
        "assignedTo": lead["assignedTo"],
        "notes": lead["notes"],
    }

    customer_result = customers_collection.insert_one(
        customer_data
    )

    # 4. Get newly created customer ID
    customer_id = str(customer_result.inserted_id)

    # 5. Update the lead
    leads_collection.update_one(
        {"_id": ObjectId(lead_id)},
        {
            "$set": {
                "converted": True,
                "convertedCustomerId": customer_id
            }
        }
    )

    # 6. Return response
    return {
        "message": "Lead converted successfully",
        "customerId": customer_id
    }


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


@app.post("/sales")
def create_sale(sale: Sale):
    sale_data = sale.model_dump()

    result = sales_collection.insert_one(sale_data)

    return {
        "message": "sale saved successfully",
        "id": str(result.inserted_id),
    }


@app.get("/sales")
def get_sales():
    sales = list(sales_collection.find())

    for sale in sales:
        sale["_id"] = str(sale["_id"])

    return sales


@app.put("/sales/{sale_id}")
def update_sale(
    sale_id: str,
    sale: Sale,
):

    sale_data = sale.model_dump()

    sales_collection.update_one(
        {"_id": ObjectId(sale_id)},
        {"$set": sale_data},
    )

    return {"message": "Sale updated successfully"}


@app.delete("/sales/{sale_id}")
def delete_sale(sale_id: str):

    sales_collection.delete_one({"_id": ObjectId(sale_id)})

    return {"message": "Sale deleted successfully"}


@app.get("/tasks")
def get_tasks():
    tasks = list(tasks_collection.find())

    for task in tasks:
        task["_id"] = str(task["_id"])

    return tasks


@app.post("/tasks")
def create_task(task: Task):
    task_data = task.model_dump()

    result = tasks_collection.insert_one(task_data)

    return {
        "message": "task saved successfully",
        "id": str(result.inserted_id),
    }


@app.put("/tasks/{task_id}")
def update_task(
    task_id: str,
    task: Task,
):
    task_data = task.model_dump()

    tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": task_data},
    )

    return {"message": "Task updated successfully"}


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    tasks_collection.delete_one({"_id": ObjectId(task_id)})

    return {"message": "Task deleted successfully"}
