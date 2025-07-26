import os
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import CSVLoader
from langchain.docstore.document import Document
from langchain.vectorstores.base import VectorStore

# Paths and settings
DATA_PATH = "./kb/documents/kdrama_list.csv"
PERSIST_DIRECTORY = "./kb/chroma"
CHROMA_COLLECTION_NAME = "kdrama_collection"

# Function to embed documents into Chroma (run once)
def embed_documents():
    # Load the CSV file (first column is assumed as content)
    loader = CSVLoader(file_path=DATA_PATH)
    documents = loader.load()

    # Split the documents into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = text_splitter.split_documents(documents)

    # Initialize embedding model
    embeddings = OpenAIEmbeddings()

    # Save the vector store to disk
    vectordb = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory=PERSIST_DIRECTORY,
        collection_name=CHROMA_COLLECTION_NAME,
    )
    vectordb.persist()
    print("✅ Embedding successful and stored in Chroma DB.")

# Function to load the vector store
def load_vectorstore() -> VectorStore:
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma(
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=embeddings,
        collection_name=CHROMA_COLLECTION_NAME,
    )
    return vectordb

# ✅ Function to perform similarity search
def similarity_search(query: str, k: int = 4):
    vectordb = load_vectorstore()
    return vectordb.similarity_search(query, k=k)
