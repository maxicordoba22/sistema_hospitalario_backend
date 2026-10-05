import { Router } from 'express';
import { getRoles, createRol, updateRol, deleteRol } from '../controllers/roles.controller';

const router = Router();

// Ya no hace falta poner '/api/roles' acá, lo definiremos en el index
router.get('/', getRoles);
router.post('/', createRol);
router.put('/:id', updateRol);
router.delete('/:id', deleteRol);

export default router;