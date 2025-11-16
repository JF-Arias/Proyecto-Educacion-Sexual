// src/domain/ModuleRepository.ts
import type { Module } from './Module.js';

export interface ModuleRepository {
  findAll(): Promise<Module[]>;
  findById(id: string): Promise<Module | null>;
}
