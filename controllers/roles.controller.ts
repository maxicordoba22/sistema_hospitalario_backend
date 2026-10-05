import { Request, Response } from 'express';
import { prisma } from '../prisma'; // Importamos tu conexión centralizada

export const getRoles = async (req: Request, res: Response) => {
    try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
    }
};

export const createRol = async (req: Request, res: Response) => {
    try {
    const { NombreRol } = req.body;
    if (!NombreRol) return res.status(400).json({ error: 'Falta NombreRol' });

    const nuevoRol = await prisma.roles.create({ data: { NombreRol } });
    res.status(201).json(nuevoRol);
    } catch (error) {
    res.status(500).json({ error: 'Error al crear rol' });
    }
};

export const updateRol = async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id as string);
    const { NombreRol } = req.body;

    const rolActualizado = await prisma.roles.update({
        where: { IdRol: id },
        data: { NombreRol }
    });
    res.json(rolActualizado);
    } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id as string);
    await prisma.roles.delete({ where: { IdRol: id } });
    res.json({ mensaje: `Rol eliminado correctamente` });
    } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol' });
    }
};