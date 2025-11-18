import { Request, Response } from "express";
import { RegisterUserUseCase } from "../application/RegisterUserUseCase";
import { LoginUserUseCase } from "../application/LoginUserUseCase";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  async register(req: Request, res: Response) {
    try {
      const output = await this.registerUserUseCase.execute(req.body);
      res.status(201).json(output);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.loginUserUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
