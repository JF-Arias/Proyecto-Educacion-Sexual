// src/presentation/server.ts
import express from 'express';
import cors from 'cors';
import { modulesRouter } from './routes/modules.routes.js';

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'content-service' });
  });

  // 👇 ESTA LÍNEA ES LA CLAVE PARA /modules
  app.use('/modules', modulesRouter);

  return app;
}
