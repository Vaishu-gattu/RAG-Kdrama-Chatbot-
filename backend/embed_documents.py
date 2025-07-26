# backend/embed_documents.py

from app.services.document_loader import load_and_process_documents

if __name__ == "__main__":
    load_and_process_documents()
    print("✅ Embedding complete.")
