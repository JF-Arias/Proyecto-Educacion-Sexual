// src/main.ts
import 'dotenv/config';
import { createServer } from './presentation/server.js';

const PORT = process.env.PORT || 4002;

const app = createServer();

app.listen(PORT, () => {
  console.log(` Content-service escuchando en el puerto ${PORT}`);
});
