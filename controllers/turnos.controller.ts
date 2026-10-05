import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getTurnos = async (req: Request, res: Response) => {
  try {
    const turnos = await prisma.turnos.findMany();
    res.json(turnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener turnos' });
  }
};

export const createTurno = async (req: Request, res: Response) => {
  try {
    const { IdPaciente, IdMedico, FechaHora, Estado, MotivoConsulta } = req.body;

    if (!IdPaciente || !IdMedico || !FechaHora) {
      return res.status(400).json({ error: 'IdPaciente, IdMedico y FechaHora son obligatorios' });
    }

    const nuevoTurno = await prisma.turnos.create({
      data: {
        IdPaciente,
        IdMedico,
        FechaHora: new Date(FechaHora), // Convertimos el string de la web a fecha de SQL Server
        Estado: Estado || "Reservado", 
        MotivoConsulta
      }
    });
    res.status(201).json(nuevoTurno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear turno' });
  }
};

export const updateTurno = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { IdPaciente, IdMedico, FechaHora, Estado, MotivoConsulta } = req.body;

    const fechaFormateada = FechaHora ? new Date(FechaHora) : undefined;

    const turnoActualizado = await prisma.turnos.update({
      where: { IdTurno: id },
      data: {
        IdPaciente,
        IdMedico,
        FechaHora: fechaFormateada,
        Estado,
        MotivoConsulta
      }
    });
    res.json(turnoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar turno' });
  }
};

export const deleteTurno = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await prisma.turnos.delete({ where: { IdTurno: id } });
    res.json({ mensaje: `Turno eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar turno' });
  }
};