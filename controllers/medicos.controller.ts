import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getMedicos = async (req: Request, res: Response) => {
  try {
    const medicos = await prisma.medicos.findMany();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener medicos' });
  }
};

export const createMedico = async (req: Request, res: Response) => {
  try {
    const { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad } = req.body;

    if (!IdUsuario || !Nombre || !Apellido || !Matricula || !IdEspecialidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoMedico = await prisma.medicos.create({
      data: { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad }
    });
    res.status(201).json(nuevoMedico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear medico' });
  }
};

export const updateMedico = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad } = req.body;

    const medico = await prisma.medicos.update({
      where: { IdMedico: id },
      data: { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad }
    });
    res.json(medico);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar medico' });
  }
};

export const deleteMedico = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await prisma.medicos.delete({ where: { IdMedico: id } });
    res.json({ mensaje: `Medico eliminado` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar medico' });
  }
};