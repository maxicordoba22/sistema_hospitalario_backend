import { Router } from 'express';
import { getHorarios, createHorario, updateHorario, deleteHorario } from '../controllers/horariosatencion.controller';

const router = Router();

router.get('/', getHorarios);
router.post('/', createHorario);
router.put('/:id', updateHorario);
router.delete('/:id', deleteHorario);

export default router;