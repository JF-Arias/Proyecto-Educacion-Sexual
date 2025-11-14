//importaciones

import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";


//entradas casos de uso
export interface LoginInput {
  email: string;
  password: string;
}

//Comparar contraseñas
export interface PasswordComparer {
  compare(plain: string, hash: string): Promise<boolean>;
}

//Crear un token
export interface TokenGenerator {
  generate(payload: object): string;
}

export class LoginUserUseCase {

  //se crea el contructor del caso de uso
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordComparer: PasswordComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(input: LoginInput): Promise<{ user: User; token: string }> {
    // 1. Buscar usuario por email
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // 2. Comparar contraseña
    const isValid = await this.passwordComparer.compare(
      input.password,
      user.passwordHash
    );

    if (!isValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // 3. Crear token
    const token = this.tokenGenerator.generate({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return { user, token };
  }
}
