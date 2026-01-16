import express from "express";
import cors from "cors";
import chatRoutes from "./rest/chat.js";
import uploadRoutes from "./rest/upload.js";
import dotenv from "dotenv";

dotenv.config(); // Must be first

const app = express();

// Verify environment variables
if (!process.env.COHERE_API_KEY) {
  console.error("⚠️  COHERE_API_KEY is not set. Please add it to your .env file");
  process.exit(1);
}

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
