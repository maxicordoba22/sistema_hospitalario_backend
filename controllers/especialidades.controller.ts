import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getEspecialidades = async (req: Request, res: Response) => {
    try {
    const especialidades = await prisma.especialidades.findMany();
    res.json(especialidades);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener especialidades' });
    } 
};

export const createEspecialidad = async (req: Request, res: Response) => {
    try {
    const { NombreEspecialidad } = req.body;
    if (!NombreEspecialidad) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const nuevaEspecialidad = await prisma.especialidades.create({
        data: { NombreEspecialidad }
    });
    res.status(201).json(nuevaEspecialidad);
    } catch (error) {
    res.status(500).json({ error: 'Error al crear especialidad' });
    }
};

export const updateEspecialidad = async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id as string);
    const { NombreEspecialidad } = req.body;

    const especialidad = await prisma.especialidades.update({
        where: { IdEspecialidad: id },
        data: { NombreEspecialidad }
    });
    res.json(especialidad);
    } catch (error) {
    res.status(500).json({ error: 'Error al actualizar especialidad' });
    }
};

export const deleteEspecialidad = async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id as string);
    await prisma.especialidades.delete({ where: { IdEspecialidad: id } });
    res.json({ mensaje: `Especialidad eliminada` });
    } catch (error) {
    res.status(500).json({ error: 'Error al eliminar especialidad' });
    }
};