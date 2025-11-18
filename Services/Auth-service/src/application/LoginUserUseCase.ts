import { UserRepository } from "../domain/UserRepository";

export interface PasswordComparator {
  compare(password: string, hash: string): Promise<boolean>;
}

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordComparator: PasswordComparator,
    private readonly tokenService: any
  ) {}

  async execute(input: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new Error("INVALID_CREDENTIALS");

    const match = await this.passwordComparator.compare(
      input.password,
      user.passwordHash
    );

    if (!match) throw new Error("INVALID_CREDENTIALS");

    const token = this.tokenService.generate({ id: user.id, email: user.email });

    return { token, user };
  }
}
