import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface PasswordHasher {
  hash(password: string): Promise<string>;
}

export interface IdGenerator {
  generate(): string;
}

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) throw new Error("EMAIL_ALREADY_IN_USE");

    const passwordHash = await this.passwordHasher.hash(input.password);

    const newUser: User = {
      id: this.idGenerator.generate(),
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role ?? "user",
    };

    await this.userRepository.save(newUser);

    return newUser;
  }
}
