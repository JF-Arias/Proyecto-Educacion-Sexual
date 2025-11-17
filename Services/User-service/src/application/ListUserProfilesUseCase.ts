import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserProfile } from "../domain/UserProfile";

export class ListUserProfilesUseCase {
  constructor(private repo: UserProfileRepository) {}

  async execute(): Promise<UserProfile[]> {
    return this.repo.findAll();
  }
}
