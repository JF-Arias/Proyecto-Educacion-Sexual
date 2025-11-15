import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserRole } from "../domain/UserProfile";

export interface CreateUserProfileInput {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

export class CreateUserProfileUseCase {
  constructor(private repo: UserProfileRepository) {}

  async execute(input: CreateUserProfileInput) {
    // 1. Verificar si ya existe un perfil para ese userId
    const existing = await this.repo.findByUserId(input.userId);
    if (existing) {
      throw new Error("PROFILE_ALREADY_EXISTS");
    }

    // 2. Crear el perfil (el repo se encarga de generar el id)
    const profile = await this.repo.create({
      userId: input.userId,
      name: input.name,
      email: input.email,
      role: input.role,
    });

    // 3. Devolver el perfil creado
    return profile;
  }
}
