"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaciente = exports.updatePaciente = exports.createPaciente = exports.getPacientes = void 0;
const prisma_1 = require("../prisma");
// GET: Leer todos los pacientes
const getPacientes = async (req, res) => {
    try {
        const pacientes = await prisma_1.prisma.pacientes.findMany();
        res.json(pacientes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
};
exports.getPacientes = getPacientes;
// POST: Crear un nuevo paciente
const createPaciente = async (req, res) => {
    try {
        // Extraemos los datos exactos que pide tu schema
        const { Nombre, Apellido, DNI, FechaNacimiento, ObraSocial, NroAfiliado, IdUsuario } = req.body;
        // Validación básica: Exigimos los campos obligatorios
        if (!Nombre || !Apellido || !DNI) {
            return res.status(400).json({ error: 'Los campos Nombre, Apellido y DNI son obligatorios' });
        }
        // Prisma exige un objeto Date para las fechas. Si nos mandan una fecha, la convertimos.
        const fechaFormateada = FechaNacimiento ? new Date(FechaNacimiento) : undefined;
        const nuevoPaciente = await prisma_1.prisma.pacientes.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el paciente' });
    }
};
exports.createPaciente = createPaciente;
// PUT: Actualizar un paciente
const updatePaciente = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Nombre, Apellido, DNI, FechaNacimiento, ObraSocial, NroAfiliado, IdUsuario } = req.body;
        const fechaFormateada = FechaNacimiento ? new Date(FechaNacimiento) : undefined;
        const pacienteActualizado = await prisma_1.prisma.pacientes.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el paciente' });
    }
};
exports.updatePaciente = updatePaciente;
// DELETE: Borrar un paciente
const deletePaciente = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.pacientes.delete({
            where: { IdPaciente: id }
        });
        res.json({ mensaje: `Paciente con ID ${id} eliminado correctamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el paciente' });
    }
};
exports.deletePaciente = deletePaciente;
