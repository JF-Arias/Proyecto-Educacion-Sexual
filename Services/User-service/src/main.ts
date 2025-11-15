import { InMemoryUserProfileRepository } from "./infrastructure/repositories/InMemoryUserProfileRepository";

import { CreateUserProfileUseCase } from "./application/CreateUserProfileUseCase";
import { GetUserProfileUseCase } from "./application/GetUserProfileUseCase";
import { ListUserProfilesUseCase } from "./application/ListUserProfilesUseCase";
import { UpdateUserProfileUseCase } from "./application/UpdateUserProfileUseCase";

import { createServer } from "./presentation/Server";

const repo = new InMemoryUserProfileRepository();

const createUser = new CreateUserProfileUseCase(repo);
const getUser = new GetUserProfileUseCase(repo);
const listUsers = new ListUserProfilesUseCase(repo);
const updateUser = new UpdateUserProfileUseCase(repo);

const app = createServer(createUser, getUser, listUsers, updateUser);

app.listen(3002, () => {
  console.log("📌 User-service escuchando en puerto 3002");
});
