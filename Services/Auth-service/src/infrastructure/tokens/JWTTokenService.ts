import jwt from "jsonwebtoken";

export class JWTTokenService {
  constructor(private secret: string) {}

  generate(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }
}
