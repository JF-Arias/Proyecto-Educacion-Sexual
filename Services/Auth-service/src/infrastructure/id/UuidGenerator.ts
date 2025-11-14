import crypto from "crypto";
import { IdGenerator } from "../../application/RegisterUserUseCase";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
