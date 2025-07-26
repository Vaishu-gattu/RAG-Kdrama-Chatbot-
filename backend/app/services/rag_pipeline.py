# rag_pipeline.py

import re
from app.db.chroma_db import load_vectorstore
from app.services.openai_api import ask_openai

def clean_markdown(text):
    # Replace 3 or more newlines with just 2
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove trailing spaces from each line
    text = '\n'.join([line.rstrip() for line in text.splitlines()])
    return text

def get_kdrama_recommendations(query: str) -> str:
    try:
        vectordb = load_vectorstore()

        # Retrieve relevant documents
        docs = vectordb.similarity_search(query, k=6)

        if docs and any(doc.page_content.strip() for doc in docs):
            context = "\n".join([doc.page_content for doc in docs])
            prompt = f"""
You are a helpful assistant that provides Korean drama recommendations using the given database content and your general knowledge (up to 2025).

Based on the context below and the user's query, suggest 1–3 Korean dramas.

For each drama, include:
**Title**
**Year** (if available)
**Genre**
**Description** (1–2 lines)

User Query:
"{query}"

Context from database:
{context}

Respond in markdown:
"""
        else:
            prompt = f"""
You are a helpful assistant that recommends Korean dramas using your knowledge (up to 2025).

The user asked: "{query}"

Please suggest 1–3 Korean dramas. For each drama, include:
**Title**
**Year** (if available)
**Genre**
**Description** (1–2 lines)

Respond in markdown:
"""

        response = ask_openai(prompt)
        return clean_markdown(response)

    except Exception as e:
        print(f"❌ Error in get_kdrama_recommendations: {e}")
        return "Sorry, an error occurred while processing your request."
