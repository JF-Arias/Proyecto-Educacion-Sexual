import express, { Application } from "express";
import cors from "cors";
import authRoutes from "../../presentation/routes/auth.routes";

export class ApiGateway {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  registerRoutes() {
    this.app.use("/auth", authRoutes);
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log("Auth-service running on port", port);
    });
  }
}
