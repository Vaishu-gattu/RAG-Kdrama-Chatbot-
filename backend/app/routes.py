# backend/app/routes.py

from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat import get_chat_response

router = APIRouter()

class QueryRequest(BaseModel):
    question: str

@router.post("/chat")
async def chat(query: QueryRequest):
    try:
        response = get_chat_response(query.question)
        return {"response": response}
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"error": "Internal Server Error"}
