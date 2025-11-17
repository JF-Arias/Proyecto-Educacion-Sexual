import {
  CreateUserProfileUseCase,
} from "../../application/CreateUserProfileUseCase";
import {
  GetUserProfileUseCase,
} from "../../application/GetUserProfileUseCase";
import {
  ListUserProfilesUseCase,
} from "../../application/ListUserProfilesUseCase";
import {
  UpdateUserProfileUseCase,
} from "../../application/UpdateUserProfileUseCase";

export class UserProfileController {
  constructor(
    private createUser: CreateUserProfileUseCase,
    private getUser: GetUserProfileUseCase,
    private listUsers: ListUserProfilesUseCase,
    private updateUser: UpdateUserProfileUseCase
  ) {}

  async create(req: any, res: any) {
    try {
      const profile = await this.createUser.execute(req.body);
      return res.status(201).json(profile);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getByUserId(req: any, res: any) {
    try {
      const profile = await this.getUser.execute(req.params.userId);
      return res.json(profile);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async list(req: any, res: any) {
    const users = await this.listUsers.execute();
    return res.json(users);
  }

  async update(req: any, res: any) {
    try {
      const updated = await this.updateUser.execute(req.params.id, req.body);
      return res.json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
