import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getRecetas = async (req: Request, res: Response) => {
  try {
    const recetas = await prisma.recetas.findMany();
    res.json(recetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
};

export const createReceta = async (req: Request, res: Response) => {
  try {
    const { IdEvolucion, Medicamento, Indicaciones } = req.body;

    if (!IdEvolucion || !Medicamento || !Indicaciones) {
      return res.status(400).json({ error: 'IdEvolucion, Medicamento e Indicaciones son obligatorios' });
    }

    const nuevaReceta = await prisma.recetas.create({
      data: {
        IdEvolucion,
        Medicamento,
        Indicaciones
      }
    });
    res.status(201).json(nuevaReceta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear receta' });
  }
};

export const updateReceta = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { IdEvolucion, Medicamento, Indicaciones } = req.body;

    const recetaActualizada = await prisma.recetas.update({
      where: { IdReceta: id },
      data: { IdEvolucion, Medicamento, Indicaciones }
    });
    res.json(recetaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar receta' });
  }
};

export const deleteReceta = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await prisma.recetas.delete({ where: { IdReceta: id } });
    res.json({ mensaje: `Receta eliminada correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar receta' });
  }
};