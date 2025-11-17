import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserRole } from "../domain/UserProfile";

interface UpdateUserProfileInput {
  name?: string;
  email?: string;
  role?: UserRole;
}

export class UpdateUserProfileUseCase {
  constructor(private repo: UserProfileRepository) {}

  async execute(id: string, data: UpdateUserProfileInput) {
    // si viene role, lo actualizamos usando el método específico
    if (data.role) {
      await this.repo.updateRole(id, data.role);
    }

    // si vienen otros datos (name / email), usamos updateProfileData
    const updated = await this.repo.updateProfileData(id, {
      name: data.name,
      email: data.email,
      role: data.role,
    });

    return updated;
  }
}
