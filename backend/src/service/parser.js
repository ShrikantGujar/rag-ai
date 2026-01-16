import fs from "fs";
import pdf from "@cedrugs/pdf-parse";

const cleanText = (text) =>
  text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

export const parseDocument = async (filePath, mimeType) => {
  // PDF parsing
  if (mimeType === "application/pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return cleanText(data.text);
  }

  if (mimeType === "text/plain") {
    const text = fs.readFileSync(filePath, "utf8");
    return cleanText(text);
  }

  throw new Error("Unsupported file type");
};
