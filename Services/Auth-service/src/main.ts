import express from "express";
import "dotenv/config";

import { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";
import { BcryptPasswordService } from "./infrastructure/hashing/BcryptPasswordService";
import { UuidGenerator } from "./infrastructure/id/UuidGenerator";
import { JWTTokenService } from "./infrastructure/tokens/JWTTokenService";

import { RegisterUserUseCase } from "./application/RegisterUserUseCase";
import { LoginUserUseCase } from "./application/LoginUserUseCase";

import { AuthController } from "./presentation/AuthController";
import { createAuthRouter } from "./presentation/routes/auth.routes";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ----- Infraestructura -----
const userRepository = new InMemoryUserRepository();
const passwordService = new BcryptPasswordService();
const uuidGenerator = new UuidGenerator();
const tokenService = new JWTTokenService(process.env.JWT_SECRET || "super-secret");

// ----- Casos de uso -----
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordService,
  uuidGenerator
);

const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  passwordService,
  tokenService
);

// ----- Controlador -----
const authController = new AuthController(
  registerUserUseCase,
  loginUserUseCase
);

// ----- Rutas -----
app.use("/auth", createAuthRouter(authController));

// ----- Servidor -----
app.listen(PORT, () => {
  console.log(`🚀 Auth-service escuchando en http://localhost:${PORT}`);
});
