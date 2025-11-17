import jwt from "jsonwebtoken";
import { TokenGenerator } from "../../application/LoginUserUseCase";

export class JWTTokenService implements TokenGenerator {
  constructor(private readonly secret: string) {}

  generate(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }
}
