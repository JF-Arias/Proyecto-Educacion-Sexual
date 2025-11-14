import { UserRepository } from '../domain/UserRepository';
import { User } from "../domain/User";


//ntrada del caso de uso
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}


//Interfaces de dependencias externas
export interface PasswordHasher {
  hash(password: string): Promise<string>;
}

export interface IdGenerator {
  generate(): string;
}


//constructor: "lo que  que los casos de uso necesita para poder registrar un usuario"
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);   //verficacion de si existe o no el email

    if (existing) {
      throw new Error("EMAIL_ALREADY_IN_USE");
    }

    //encriptar claver
    const passwordHash = await this.passwordHasher.hash(input.password);


    //Crear el objeto usuario
    const user = {
      id: this.idGenerator.generate(),
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role ?? "user"
    };


    //Guardar en el repositorio
    const created = await this.userRepository.create({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role
    });

    return created;
  }
}
