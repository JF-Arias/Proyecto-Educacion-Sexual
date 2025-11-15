import { UserProfileRepository } from "../domain/UserProfileRepository";

export class GetUserProfileUseCase {
  constructor(private repo: UserProfileRepository) {}

  async execute(userId: string) {
    const profile = await this.repo.findByUserId(userId);
    if (!profile) {
      throw new Error("PROFILE_NOT_FOUND");
    }
    return profile;
  }
}
