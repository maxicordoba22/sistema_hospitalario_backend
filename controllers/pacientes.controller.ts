import { Request, Response } from 'express';
import { prisma } from '../prisma'; 

// GET: Leer todos los pacientes
export const getPacientes = async (req: Request, res: Response) => {
    try {
    const pacientes = await prisma.pacientes.findMany(); 
    res.json(pacientes);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pacientes' });
    }
};

// POST: Crear un nuevo paciente
export const createPaciente = async (req: Request, res: Response) => {
    try {
    // Extraemos los datos exactos que pide tu schema
    const { Nombre, Apellido, DNI, FechaNacimiento, ObraSocial, NroAfiliado, IdUsuario } = req.body;

    // Validación básica: Exigimos los campos obligatorios
    if (!Nombre || !Apellido || !DNI) {
        return res.status(400).json({ error: 'Los campos Nombre, Apellido y DNI son obligatorios' });
    }

    // Prisma exige un objeto Date para las fechas. Si nos mandan una fecha, la convertimos.
    const fechaFormateada = FechaNacimiento ? new Date(FechaNacimiento) : undefined;

    const nuevoPaciente = await prisma.pacientes.create({
        data: {
        Nombre,
        Apellido,
        DNI,
        FechaNacimiento: fechaFormateada,
        ObraSocial,
        NroAfiliado,
        IdUsuario
        }
    });

    res.status(201).json(nuevoPaciente);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el paciente' });
    } 
};  

// PUT: Actualizar un paciente
export const updatePaciente = async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id as string);
    const { Nombre, Apellido, DNI, FechaNacimiento, ObraSocial, NroAfiliado, IdUsuario } = req.body;

    const fechaFormateada = FechaNacimiento ? new Date(FechaNacimiento) : undefined;

    const pacienteActualizado = await prisma.pacientes.update({
        where: { IdPaciente: id },
        data: {
        Nombre,
        Apellido,
        DNI,
        FechaNacimiento: fechaFormateada,
        ObraSocial,
        NroAfiliado,
        IdUsuario
        }
    });

    res.json(pacienteActualizado);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el paciente' });
    }
};

// DELETE: Borrar un paciente
export const deletePaciente = async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id as string);
    await prisma.pacientes.delete({
        where: { IdPaciente: id }
    });
    res.json({ mensaje: `Paciente con ID ${id} eliminado correctamente` });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el paciente' });
    }
};