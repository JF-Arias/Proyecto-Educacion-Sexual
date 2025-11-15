import { Router } from "express";
import { UserProfileController } from "../controllers/UserProfileController";

export function userProfileRoutes(controller: UserProfileController) {
  const router = Router();

  // Crear perfil
  router.post("/", (req, res) => controller.create(req, res));

  // Listar todos los perfiles
  router.get("/", (req, res) => controller.list(req, res));

  // Obtener perfil por userId (el que viene de auth-service)
  router.get("/user/:userId", (req, res) => controller.getByUserId(req, res));

  // Actualizar datos (nombre, email, role, etc.) por id interno del perfil
  router.patch("/:id", (req, res) => controller.update(req, res));

  return router;
}
