import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// --- Test endpoint ---
app.get("/health", (req, res) => {
  res.send("Auth-service is running");
});

app.listen(process.env.PORT, async () => {
  console.log(`🚀 Auth-service corriendo en puerto ${process.env.PORT}`);

  try {
    await prisma.$connect();
    console.log("✅ Conectado correctamente a PostgreSQL Azure");
  } catch (err) {
    console.error("❌ Error conectando a la BD:", err);
  }
});

