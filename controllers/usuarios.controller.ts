import { Request, Response } from 'express';
import { prisma } from '../prisma';

// GET: Leer todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
    try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// POST: Crear un nuevo usuario
export const createUsuario = async (req: Request, res: Response) => {
    try {
    const { Email, PasswordHash, IdRol, Activo } = req.body;

    // Validamos campos obligatorios según tu schema
    if (!Email || !PasswordHash || !IdRol) {
        return res.status(400).json({ error: 'Email, PasswordHash e IdRol son obligatorios' });
    }

    const nuevoUsuario = await prisma.usuarios.create({
        data: {
        Email,
        PasswordHash,
        IdRol,
        Activo
        }
    });

    res.status(201).json(nuevoUsuario);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// PUT: Actualizar un usuario
export const updateUsuario = async (req: Request, res: Response) => {
    try {
    // IMPORTANTE: Como IdUsuario es String (UUID), NO usamos parseInt()
    const id = req.params.id as string; 
    const { Email, PasswordHash, IdRol, Activo } = req.body;

    const usuarioActualizado = await prisma.usuarios.update({
        where: { IdUsuario: id },
        data: {
        Email,
        PasswordHash,
        IdRol,
        Activo
        }
    });

    res.json(usuarioActualizado);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// DELETE: Borrar un usuario
export const deleteUsuario = async (req: Request, res: Response) => {
    try {
    // Nuevamente, tomamos el id como String
    const id = req.params.id as string; 

    await prisma.usuarios.delete({
        where: { IdUsuario: id }
    });

    res.json({ mensaje: `Usuario eliminado correctamente` });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};