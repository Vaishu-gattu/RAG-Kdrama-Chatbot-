from dotenv import load_dotenv
load_dotenv()

from app.services.rag_pipeline import get_kdrama_recommendations

def get_chat_response(question: str) -> str:
    try:
        # Use the full RAG + GPT pipeline
        response = get_kdrama_recommendations(question)
        return response
    except Exception as e:
        print(f"Error in get_chat_response: {e}")
        return "Sorry, I encountered an error while generating your response."
