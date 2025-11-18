import { ApiGateway } from "./infrastructure/http/ApiGateway";

import { RegisterUserUseCase } from "./application/RegisterUserUseCase";
import { LoginUserUseCase } from "./application/LoginUserUseCase";

import { PostgresUserRepository } from "./infrastructure/repositories/PostgresUserRepository";
import { BcryptPasswordService } from "./infrastructure/hashing/BcryptPasswordService";
import { JWTTokenService } from "./infrastructure/tokens/JWTTokenService";

import { AuthController } from "./presentation/AuthController";
import { setAuthController } from "./presentation/routes/auth.routes";

// 🔥 Este es el repositorio real (Postgres), NO el in-memory
const userRepository = new PostgresUserRepository();

// Hash y token services
const hashService = new BcryptPasswordService();
const tokenService = new JWTTokenService("secret123");

// Generador de IDs
const idGenerator = { generate: () => crypto.randomUUID() };

// Casos de uso
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  hashService,
  idGenerator
);

const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  hashService,
  tokenService
);

// Controlador
const authController = new AuthController(
  registerUserUseCase,
  loginUserUseCase
);

// Conectar controlador con router
setAuthController(authController);

// API Gateway
const api = new ApiGateway();
api.registerRoutes();
api.start(3000);
