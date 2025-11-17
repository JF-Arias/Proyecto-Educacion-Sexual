import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("⏳ Intentando conectar a chatbot_db...");
    await prisma.$connect();
    console.log("✅ Conexión exitosa a chatbot_db!");
  } catch (error) {
    console.error("❌ Error al conectar:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
