from pydantic import BaseModel
from bson import ObjectId
from database import proposals_collection


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
    
    