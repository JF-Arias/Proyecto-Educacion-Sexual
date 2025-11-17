import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("⏳ Intentando conectar a Azure PostgreSQL...");
    await prisma.$connect();
    console.log("✅ Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("❌ Error al conectar a la BD:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

