// src/application/GetModuleDetailUseCase.ts
import type { ModuleRepository } from '../domain/ModuleRepository.js';

export class GetModuleDetailUseCase {
  constructor(private moduleRepo: ModuleRepository) {}

  async execute(id: string) {
    return this.moduleRepo.findById(id);
  }
}
