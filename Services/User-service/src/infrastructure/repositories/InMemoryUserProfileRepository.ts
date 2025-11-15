import { UserProfile, UserRole } from "../../domain/UserProfile";
import { UserProfileRepository } from "../../domain/UserProfileRepository";
import { randomUUID } from "crypto";

export class InMemoryUserProfileRepository
  implements UserProfileRepository
{
  private profiles: UserProfile[] = [];

  async create(profile: Omit<UserProfile, "id">): Promise<UserProfile> {
    const newProfile: UserProfile = { ...profile, id: randomUUID() };
    this.profiles.push(newProfile);
    return newProfile;
  }

  async findById(id: string): Promise<UserProfile | null> {
    return this.profiles.find((p) => p.id === id) ?? null;
  }

  async findByUserId(userId: string): Promise<UserProfile | null> {
    return this.profiles.find((p) => p.userId === userId) ?? null;
  }

  async findAll(): Promise<UserProfile[]> {
    return [...this.profiles];
  }

  async updateRole(id: string, newRole: UserRole): Promise<UserProfile> {
    const profile = this.profiles.find((p) => p.id === id);
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    profile.role = newRole;
    return profile;
  }

  async updateProfileData(
    id: string,
    data: Partial<Omit<UserProfile, "id" | "userId">>
  ): Promise<UserProfile> {
    const profile = this.profiles.find((p) => p.id === id);
    if (!profile) throw new Error("PROFILE_NOT_FOUND");

    if (data.name !== undefined) profile.name = data.name;
    if (data.email !== undefined) profile.email = data.email;
    if (data.role !== undefined) profile.role = data.role;

    return profile;
  }
}
