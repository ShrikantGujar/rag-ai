import express from "express";
import multer from "multer";
import { uploadDoc, queryDocs } from "../controller/upload.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/file", upload.single("file"), uploadDoc);
router.post("/query", queryDocs);

export default router;
