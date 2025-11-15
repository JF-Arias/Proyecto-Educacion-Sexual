import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserProfile, UserRole } from "../domain/UserProfile";
import { randomUUID } from "crypto";

interface CreateProfileInput {
  userId: string;   // viene del auth-service
  name: string;
  email: string;
  role?: UserRole;  // si no se envía, quedará "student"
}

export class CreateUserProfileUseCase {
  constructor(private repository: UserProfileRepository) {}

  async execute(input: CreateProfileInput): Promise<UserProfile> {
    const existing = await this.repository.findByUserId(input.userId);

    if (existing) {
      throw new Error("PROFILE_ALREADY_EXISTS");
    }

    const newProfile: UserProfile = {
      id: randomUUID(),
      userId: input.userId,
      name: input.name,
      email: input.email,
      role: input.role ?? "student"
    };

    return this.repository.create(newProfile);
  }
}
