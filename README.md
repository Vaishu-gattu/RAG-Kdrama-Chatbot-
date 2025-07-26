# RAG K-Drama Chatbot

This is a Retrieval-Augmented Generation (RAG) based chatbot that recommends Korean dramas and answers user queries using a combination of OpenAI GPT models and a local Chroma vector database.

The frontend is built with React and styled for a modern, sleek user experience. The backend uses FastAPI and ChromaDB to handle semantic search from a knowledge base of K-Drama data.

---

## Features

- Ask for drama recommendations by genre, mood, actor, or year
- Auto-scroll and well-formatted answers from GPT
- Uses both local vectorstore and OpenAI’s general knowledge
- Custom styling with a lavender theme and background
- Clean, markdown-formatted responses
- Welcome message and attribution footer

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** FastAPI, Python
- **LLM Integration:** OpenAI GPT-4-turbo (via API)
- **Database:** ChromaDB for vector search
- **Other Tools:** LangChain, Markdown rendering

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rag-kdrama-chatbot.git
cd rag-kdrama-chatbot
```

### 2. Set Up the Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

- Make sure you have your `OPENAI_API_KEY` set in `.env`

### 3. Set Up the Frontend

```bash
cd frontend
npm install
npm start
```

---

## Screenshots

### Chat UI (Initial View)
![Chat UI - Welcome](screenshots/chat_welcome.png)

### Chat UI with Response
![Chat UI - Response](screenshots/chat_response.png)

> _Note: Add actual screenshots inside a `/screenshots` folder and update filenames accordingly._

---

## Folder Structure

```
rag-kdrama-chatbot/
├── backend/
│   ├── app/
│   │   ├── db/
│   │   ├── services/
│   │   └── main.py
│   └── rag_pipeline.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── tailwind.config.js
├── screenshots/
└── README.md
```

---

## Author

Developed by [Vaishu Gattu](https://www.linkedin.com/in/vaishu-gattu)

- [GitHub](https://github.com/vaishu-gattu)

---

## License

This project is open-source and free to use for educational purposes.