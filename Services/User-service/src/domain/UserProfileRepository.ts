import { UserProfile, UserRole } from "./UserProfile";

export interface UserProfileRepository {
  create(profile: Omit<UserProfile, "id">): Promise<UserProfile>;

  findById(id: string): Promise<UserProfile | null>;

  findByUserId(userId: string): Promise<UserProfile | null>;

  findAll(): Promise<UserProfile[]>;

  updateRole(id: string, newRole: UserRole): Promise<UserProfile>;

  updateProfileData(
    id: string,
    data: Partial<Omit<UserProfile, "id" | "userId">>
  ): Promise<UserProfile>;
}
