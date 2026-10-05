import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getHistorias = async (req: Request, res: Response) => {
  try {
    const historias = await prisma.historiaClinica.findMany();
    res.json(historias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historias clínicas' });
  }
};

export const createHistoria = async (req: Request, res: Response) => {
  try {
    const { IdTurno, IdPaciente, IdMedico, MotivoRealConsulta, Sintomas, Diagnostico, Tratamiento } = req.body;

    if (!IdTurno || !IdPaciente || !IdMedico) {
      return res.status(400).json({ error: 'IdTurno, IdPaciente e IdMedico son obligatorios' });
    }

    const nuevaHistoria = await prisma.historiaClinica.create({
      data: {
        IdTurno,
        IdPaciente,
        IdMedico,
        MotivoRealConsulta,
        Sintomas,
        Diagnostico,
        Tratamiento
      }
    });
    res.status(201).json(nuevaHistoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear historia clínica' });
  }
};

export const updateHistoria = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { MotivoRealConsulta, Sintomas, Diagnostico, Tratamiento } = req.body;

    const historiaActualizada = await prisma.historiaClinica.update({
      where: { IdEvolucion: id },
      data: { MotivoRealConsulta, Sintomas, Diagnostico, Tratamiento }
    });
    res.json(historiaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar historia clínica' });
  }
};

export const deleteHistoria = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await prisma.historiaClinica.delete({ where: { IdEvolucion: id } });
    res.json({ mensaje: `Historia clínica eliminada correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar historia clínica' });
  }
};