import { getEmbeddings } from "./embeddings.js";

let vectorStore = []; // [{ embedding: [], text: "" }]

/**
 * Create local vector store
 */
export const createLocalVectorStore = async (chunks) => {
  if (!chunks || !chunks.length) {
    throw new Error("No text chunks provided to create vector store");
  }

  const embeddings = await getEmbeddings(chunks);

  if (!embeddings || !embeddings.length) {
    throw new Error("Embeddings not returned from Cohere API");
  }

  vectorStore = chunks.map((text, i) => ({
    embedding: embeddings[i],
    text,
  }));
};

/**
 * Query local vector store
 */
export const queryLocalVectorStore = async (query, topK = 5) => {
  if (!vectorStore.length) throw new Error("Vector store not initialized");

  const queryEmbedding = (await getEmbeddings([query]))[0];

  const cosineSimilarity = (a, b) => {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (normA * normB);
  };

  const scored = vectorStore.map((v) => ({
    text: v.text,
    score: cosineSimilarity(queryEmbedding, v.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((v) => v.text);
};
