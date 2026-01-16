import express from "express";
import { chat } from "../service/chat.js";

const router = express.Router();

router.post("/", chat);

export default router;
