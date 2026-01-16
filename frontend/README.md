# Document Chat AI - Frontend

This is the **React frontend** for the Document Chat AI project. It provides a modern, interactive interface to upload documents and ask questions using the RAG-based Node.js backend.

---
## Features

- Upload documents (PDF, text, etc.) to the backend
- Ask questions and retrieve answers from uploaded documents
- Responsive, clean UI built with **Material-UI (MUI)**
- Loading states for file upload and query
- Displays results in card-style sections for clarity

---
## Tech Stack

- React (Create React App)
- Material-UI (MUI) for UI components
- Axios for HTTP requests to backend
- Node.js backend (running at `http://localhost:8000`)
- Supports RAG queries for document retrieval

---
## Installation

1. Navigate to the frontend folder:
cd frontend
Install dependencies:


npm install
Start the development server:


npm start
The app will run at:


http://localhost:3000
🔗 Backend Integration
The frontend expects the backend Node.js API to be running at:

http://localhost:8000
API Endpoints
Endpoint	Method	Description
/api/v1/upload/file	POST	Upload a document for processing
/api/v1/upload/query	POST	Send a query to the vector store and get results

Make sure your Node.js backend is running and COHERE_API_KEY is set in .env.

📂 File Structure
pgsql
Copy code
frontend/
├─ public/                 # Static files
├─ src/
│  ├─ App.js               # Main React component
│  ├─ index.js             # Entry point
│  └─ index.css            # Global styles (MUI styles in use)
├─ package.json
└─ README.md