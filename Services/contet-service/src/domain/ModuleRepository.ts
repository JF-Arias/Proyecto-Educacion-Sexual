// src/domain/ModuleRepository.ts
import type { Module } from './module.js';

export interface ModuleRepository {
  findAll(): Promise<Module[]>;
  findById(id: string): Promise<Module | null>;
}
