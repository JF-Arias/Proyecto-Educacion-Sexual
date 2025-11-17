import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/User";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: Omit<User, "id">): Promise<User> {
    const newUser = {
      ...user,
      id: crypto.randomUUID(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = this.users.find(u => u.email === email);
    return found ?? null;
  }
}
