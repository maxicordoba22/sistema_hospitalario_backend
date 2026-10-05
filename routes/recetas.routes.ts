import { Router } from 'express';
import { getRecetas, createReceta, updateReceta, deleteReceta } from '../controllers/recetas.controller';

const router = Router();

router.get('/', getRecetas);
router.post('/', createReceta);
router.put('/:id', updateReceta);
router.delete('/:id', deleteReceta);

export default router;