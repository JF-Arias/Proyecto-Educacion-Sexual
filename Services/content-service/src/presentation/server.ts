// src/presentation/server.ts
import express from 'express';
import cors from 'cors';
import { modulesRouter } from './routes/modules.routes.js';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // 🔍 Middleware para ver qué está llegando
  app.use((req, res, next) => {
    console.log(`➡️  ${req.method} ${req.url}`);
    next();
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'content-service' });
  });

  app.use('/modules', modulesRouter);

  // (Opcional) ver si algo no matchea
  app.use((req, res) => {
    console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'NOT_FOUND_FROM_SERVER' });
  });

  return app;
}
