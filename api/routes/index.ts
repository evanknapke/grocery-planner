import { Router } from 'express';
import healthRoutes from './health.js';
import recipesRoutes from './recipes.js';
import groceryListsRoutes from './groceryLists.js';

const router = Router();
router.use('/health', healthRoutes);
router.use('/recipes', recipesRoutes);
router.use('/grocery-lists', groceryListsRoutes);

export default router;
