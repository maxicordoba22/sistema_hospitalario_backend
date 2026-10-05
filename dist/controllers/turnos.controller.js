"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTurno = exports.updateTurno = exports.createTurno = exports.getTurnos = void 0;
const prisma_1 = require("../prisma");
const getTurnos = async (req, res) => {
    try {
        const turnos = await prisma_1.prisma.turnos.findMany();
        res.json(turnos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener turnos' });
    }
};
exports.getTurnos = getTurnos;
const createTurno = async (req, res) => {
    try {
        const { IdPaciente, IdMedico, FechaHora, Estado, MotivoConsulta } = req.body;
        if (!IdPaciente || !IdMedico || !FechaHora) {
            return res.status(400).json({ error: 'IdPaciente, IdMedico y FechaHora son obligatorios' });
        }
        const nuevoTurno = await prisma_1.prisma.turnos.create({
            data: {
                IdPaciente,
                IdMedico,
                FechaHora: new Date(FechaHora), // Convertimos el string de la web a fecha de SQL Server
                Estado: Estado || "Reservado",
                MotivoConsulta
            }
        });
        res.status(201).json(nuevoTurno);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear turno' });
    }
};
exports.createTurno = createTurno;
const updateTurno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { IdPaciente, IdMedico, FechaHora, Estado, MotivoConsulta } = req.body;
        const fechaFormateada = FechaHora ? new Date(FechaHora) : undefined;
        const turnoActualizado = await prisma_1.prisma.turnos.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar turno' });
    }
};
exports.updateTurno = updateTurno;
const deleteTurno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.turnos.delete({ where: { IdTurno: id } });
        res.json({ mensaje: `Turno eliminado correctamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar turno' });
    }
};
exports.deleteTurno = deleteTurno;
