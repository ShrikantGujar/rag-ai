import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;
export const getEmbeddings = async (texts) => {
  if (!texts || !texts.length) throw new Error("No texts provided for embeddings");

  const response = await fetch("https://api.cohere.com/v2/embed", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "embed-english-v3.0",
      input_type: "search_document",
      texts,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Cohere API error:", data);
    throw new Error(`Cohere error: ${JSON.stringify(data)}`);
  }

  if (!data.embeddings || !data.embeddings.float) {
    console.error("Cohere API returned no embeddings:", data);
    throw new Error("Embeddings not returned from Cohere API");
  }

  return data.embeddings.float;
};