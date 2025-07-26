# backend/app/services/document_loader.py

import pandas as pd
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.db.chroma_db import create_vectorstore
import os


def load_csv_documents(csv_path: str):
    df = pd.read_csv(csv_path)

    docs = []
    for _, row in df.iterrows():
        # Combine important fields into a single string
        content = f"""
Title: {row.get('title', '')}
Year: {row.get('year', '')}
Genre: {row.get('genre', '')}
Cast: {row.get('cast', '')}
Description: {row.get('description', '')}
"""
        docs.append(Document(page_content=content.strip(), metadata={"source": csv_path}))

    return docs


def load_and_process_documents():
    csv_path = os.path.join("knowledge_base", "documents", "kdrama_list.csv")
    documents = load_csv_documents(csv_path)

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_documents(documents)

    create_vectorstore(chunks)
