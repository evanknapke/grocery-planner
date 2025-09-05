import { Router } from 'express';
import healthRoutes from './health.js';
import recipesRoutes from './recipes.js';

const router = Router();

// Mount route modules
router.use('/health', healthRoutes);
router.use('/recipes', recipesRoutes);

export default router;
