import { Router } from "express";
import { AuthController } from "../AuthController";

const router = Router();

// Dependencias serán inyectadas en main.ts
let controller: AuthController;

export function setAuthController(ctrl: AuthController) {
  controller = ctrl;
}

router.post("/register", (req, res) => controller.register(req, res));
router.post("/login", (req, res) => controller.login(req, res));

export default router;
