import { Router } from "express";
import { chatController } from "../controllers/chatController";

const router = Router();

// POST /chatbot/chat
router.post("/chat", chatController.handleChatMessage);

// GET /chatbot/topics
router.get("/topics", chatController.getTopics);

export default router;
