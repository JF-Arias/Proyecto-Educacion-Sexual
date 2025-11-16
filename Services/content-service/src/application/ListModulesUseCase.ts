// src/application/ListModulesUseCase.ts
import type { ModuleRepository } from '../domain/ModuleRepository.js';

export class ListModulesUseCase {
  constructor(private moduleRepo: ModuleRepository) {}

  async execute() {
    return this.moduleRepo.findAll();
  }
}
