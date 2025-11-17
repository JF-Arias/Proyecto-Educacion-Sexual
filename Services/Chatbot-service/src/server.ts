import "dotenv/config";
import express from "express";
import chatRoutes from "./presentation/http/routes/chatRoutes";

const app = express();
app.use(express.json());

// Registrar rutas del chatbot
app.use("/chatbot", chatRoutes);

const PORT = process.env.PORT ?? 3003;

app.listen(PORT, () => {
  console.log(`🤖 Chatbot-service running on http://localhost:${PORT}`);
});
