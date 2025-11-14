
import type { ModuleRepository } from '../domain/modulerepository.js';

export class GetModuleDetailUseCase {
  constructor(private moduleRepo: ModuleRepository) {}

  async execute(id: string) {
    return this.moduleRepo.findById(id);
  }
}
