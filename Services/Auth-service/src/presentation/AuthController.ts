import { Request, Response } from "express";
import { RegisterUserUseCase } from "../application/RegisterUserUseCase";
import { LoginUserUseCase } from "../application/LoginUserUseCase";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const user = await this.registerUserUseCase.execute({
        name,
        email,
        password,
        role,
      });

      return res.status(201).json({
        message: "Usuario creado correctamente",
        user,
      });

    } catch (error: any) {
      console.error(error);
      return res.status(400).json({
        error: error.message ?? "Error al registrar usuario",
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await this.loginUserUseCase.execute({ email, password });

      return res.status(200).json({
        message: "Inicio de sesión correcto",
        user: result.user,
        token: result.token,
      });

    } catch (error: any) {
      return res.status(401).json({
        error: error.message ?? "Credenciales inválidas",
      });
    }
  };
}
