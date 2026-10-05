import { Router } from 'express';
import { getHistorias, createHistoria, updateHistoria, deleteHistoria } from '../controllers/historiaclinica.controller';

const router = Router();

router.get('/', getHistorias);
router.post('/', createHistoria);
router.put('/:id', updateHistoria);
router.delete('/:id', deleteHistoria);

export default router;