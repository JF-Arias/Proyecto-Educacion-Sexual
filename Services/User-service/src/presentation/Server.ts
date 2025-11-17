import express from "express";
import { userProfileRoutes } from "./routes/userProfileRoutes";
import { UserProfileController } from "./controllers/UserProfileController";

export function createServer(
  createUser: any,
  updateRole: any,
  updateData: any,
  repo: any
) {
  const app = express();
  app.use(express.json());

  const controller = new UserProfileController(
    createUser,
    updateRole,
    updateData,
    repo
  );

  app.use("/profiles", userProfileRoutes(controller));

  return app;
}
