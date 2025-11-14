import bcrypt from "bcrypt";
import { PasswordHasher } from "../../application/RegisterUserUseCase";
import { PasswordComparer } from "../../application/LoginUserUseCase";

export class BcryptPasswordService implements PasswordHasher, PasswordComparer {
  private readonly rounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.rounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
