# Local RAG System – Node.js Backend

This project is a **Retrieval-Augmented Generation (RAG)** system built in **Node.js** that allows you to:

- Upload PDF or TXT documents  
- Parse and chunk text  
- Generate embeddings using **Cohere API**  
- Store vectors locally (in-memory)  
- Query documents via cosine similarity  

---
## Features
1. **File Upload Endpoint** (`/api/v1/upload/file`)  
   - Upload PDF or TXT files  
   - Chunk the text and create embeddings  
   - Store embeddings in a local vector store  

2. **Query Endpoint** (`/api/v1/upload/query`)  
   - Send a query string  
   - Retrieve top-K most relevant chunks from uploaded documents  

---
## Tech Stack

- **Node.js + Express** – Backend server  
- **Cohere API** – Embedding generation  
- **PDF/TXT parser** – Extract text from documents  
- **Local in-memory vector store** – Stores embeddings for fast retrieval  
- **dotenv** – Environment variable management  

---
## Project Structure

backend/
├─ src/
│ ├─ controller/
│ │ ├─ upload.js # File upload controller
│ │ └─ query.js # Query controller
│ ├─ service/
│ │ ├─ parser.js # PDF/TXT parsing
│ │ ├─ embeddings.js # Cohere API embeddings
│ │ └─ vectorstore.js # Local vector store & query logic
│ ├─ server.js # Express app setup
│ └─ env.js # Environment variables
├─ package.json
└─ .env # Cohere API key, PORT, etc.

yaml
Copy code

---

## Quick Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd backend
Install dependencies

bash
npm install
Add environment variables (.env)

env
PORT=8000
COHERE_API_KEY=your_cohere_api_key_here
Run the server

bash
npm start
Server will start on http://localhost:8000.

API Endpoints
1. Upload File
POST /api/v1/upload/file
Content-Type: multipart/form-data
Form field:

file → PDF or TXT file

Response Example:

json
{
  "message": "File processed and vector store created",
  "chunks": 1,
  "sampleChunk": "Denny Gunawan 221 Queen St Melbourne VIC 3000 $39.60 ..."
}
2. Query Vector Store
POST /api/v1/upload/query
Content-Type: application/json
Request Body:
{
  "query": "What is the total amount on the invoice?"
}
Response Example:

json
{
  "query": "What is the total amount on the invoice?",
  "results": [
    "Denny Gunawan 221 Queen St Melbourne VIC 3000 $39.60 ..."
  ]
}