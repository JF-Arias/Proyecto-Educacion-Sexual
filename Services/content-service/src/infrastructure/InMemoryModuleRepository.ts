// src/infrastructure/InMemoryModuleRepository.ts
import type { ModuleRepository } from '../domain/ModuleRepository.js';
import type { Module } from '../domain/Module.js';

const MOCK_MODULES: Module[] = [
  {
    id: '1',
    title: 'Anatomía y cuerpo',
    description: 'Conoce las partes del cuerpo y sus funciones.',
    category: 'anatomia',
    content: 'Contenido completo del módulo de anatomía...'
  },
  {
    id: '2',
    title: 'Métodos anticonceptivos',
    description: 'Aprende sobre métodos para prevenir embarazos.',
    category: 'anticonceptivos',
    content: 'Contenido completo del módulo de anticonceptivos...'
  }
];

export class InMemoryModuleRepository implements ModuleRepository {
  async findAll(): Promise<Module[]> {
    return MOCK_MODULES;
  }

  async findById(id: string): Promise<Module | null> {
    const module = MOCK_MODULES.find((m) => m.id === id);
    return module ?? null;
  }
}
