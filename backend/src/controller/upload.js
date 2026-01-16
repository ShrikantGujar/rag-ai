import { parseDocument } from "../service/parser.js";
import { chunkText } from "../service/chunker.js";
import { createLocalVectorStore, queryLocalVectorStore } from "../service/vectorstore.js";

export const uploadDoc = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File missing" });

    const text = await parseDocument(req.file.path, req.file.mimetype);
    const chunks = chunkText(text);
    await createLocalVectorStore(chunks);

    res.json({
      message: "File processed and vector store created",
      chunks: chunks.length,
      sampleChunk: chunks[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const queryDocs = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query missing" });

    const topChunks = await queryLocalVectorStore(query, 5);
    res.json({ query, results: topChunks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
