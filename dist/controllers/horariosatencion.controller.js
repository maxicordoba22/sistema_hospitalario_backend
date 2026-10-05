"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHorario = exports.updateHorario = exports.createHorario = exports.getHorarios = void 0;
const prisma_1 = require("../prisma");
const getHorarios = async (req, res) => {
    try {
        const horarios = await prisma_1.prisma.horariosAtencion.findMany();
        res.json(horarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener horarios de atención' });
    }
};
exports.getHorarios = getHorarios;
const createHorario = async (req, res) => {
    try {
        const { IdMedico, DiaSemana, HoraInicio, HoraFin, DuracionTurnoMinutos } = req.body;
        // DiaSemana es un número (ej: 1 para Lunes, 2 para Martes, etc.)
        if (!IdMedico || DiaSemana === undefined || !HoraInicio || !HoraFin) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }
        const nuevoHorario = await prisma_1.prisma.horariosAtencion.create({
            data: {
                IdMedico,
                DiaSemana,
                HoraInicio: new Date(HoraInicio), // Convertimos el texto a formato fecha/hora
                HoraFin: new Date(HoraFin),
                DuracionTurnoMinutos: DuracionTurnoMinutos || 20 // Si no lo mandan, por defecto dura 20 min
            }
        });
        res.status(201).json(nuevoHorario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear horario de atención' });
    }
};
exports.createHorario = createHorario;
const updateHorario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { IdMedico, DiaSemana, HoraInicio, HoraFin, DuracionTurnoMinutos } = req.body;
        const horaInicioFormateada = HoraInicio ? new Date(HoraInicio) : undefined;
        const horaFinFormateada = HoraFin ? new Date(HoraFin) : undefined;
        const horarioActualizado = await prisma_1.prisma.horariosAtencion.update({
            where: { IdHorario: id },
            data: {
                IdMedico,
                DiaSemana,
                HoraInicio: horaInicioFormateada,
                HoraFin: horaFinFormateada,
                DuracionTurnoMinutos
            }
        });
        res.json(horarioActualizado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar horario' });
    }
};
exports.updateHorario = updateHorario;
const deleteHorario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.horariosAtencion.delete({ where: { IdHorario: id } });
        res.json({ mensaje: `Horario eliminado correctamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar horario' });
    }
};
exports.deleteHorario = deleteHorario;
