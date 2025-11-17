import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("chatbot-service is running");
});

app.listen(process.env.PORT, async () => {
  console.log(`🚀 Chatbot-service corriendo en puerto ${process.env.PORT}`);

  try {
    await prisma.$connect();
    console.log("✅ Prisma conectado a chatbot_db");
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  }
});

