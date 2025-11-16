// src/presentation/routes/modules.routes.ts
import { Router } from 'express';
import { InMemoryModuleRepository } from '../../infrastructure/InMemoryModuleRepository.js';
import { ListModulesUseCase } from '../../application/ListModulesUseCase.js';
import { GetModuleDetailUseCase } from '../../application/GetModuleDetailUseCase.js';

const modulesRouter = Router();

const moduleRepo = new InMemoryModuleRepository();
const listModules = new ListModulesUseCase(moduleRepo);
const getModuleDetail = new GetModuleDetailUseCase(moduleRepo);

// GET /modules
modulesRouter.get('/', async (req, res) => {
  const modules = await listModules.execute();
  res.json(modules);
});

// GET /modules/:id
modulesRouter.get('/:id', async (req, res) => {
  const module = await getModuleDetail.execute(req.params.id);
  if (!module) {
    return res.status(404).json({ error: 'NOT_FOUND' });
  }
  res.json(module);
});

export { modulesRouter };
