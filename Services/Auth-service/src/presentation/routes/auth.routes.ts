import { Router } from "express";
import { AuthController } from "../AuthController";

export const createAuthRouter = (controller: AuthController): Router => {
  const router = Router();

  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
};
