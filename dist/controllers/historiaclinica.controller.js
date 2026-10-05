"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistoria = exports.updateHistoria = exports.createHistoria = exports.getHistorias = void 0;
const prisma_1 = require("../prisma");
const getHistorias = async (req, res) => {
    try {
        const historias = await prisma_1.prisma.historiaClinica.findMany();
        res.json(historias);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener historias clínicas' });
    }
};
exports.getHistorias = getHistorias;
const createHistoria = async (req, res) => {
    try {
        const { IdTurno, IdPaciente, IdMedico, MotivoRealConsulta, Sintomas, Diagnostico, Tratamiento } = req.body;
        if (!IdTurno || !IdPaciente || !IdMedico) {
            return res.status(400).json({ error: 'IdTurno, IdPaciente e IdMedico son obligatorios' });
        }
        const nuevaHistoria = await prisma_1.prisma.historiaClinica.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear historia clínica' });
    }
};
exports.createHistoria = createHistoria;
const updateHistoria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { MotivoRealConsulta, Sintomas, Diagnostico, Tratamiento } = req.body;
        const historiaActualizada = await prisma_1.prisma.historiaClinica.update({
            where: { IdEvolucion: id },
            data: { MotivoRealConsulta, Sintomas, Diagnostico, Tratamiento }
        });
        res.json(historiaActualizada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar historia clínica' });
    }
};
exports.updateHistoria = updateHistoria;
const deleteHistoria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.historiaClinica.delete({ where: { IdEvolucion: id } });
        res.json({ mensaje: `Historia clínica eliminada correctamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar historia clínica' });
    }
};
exports.deleteHistoria = deleteHistoria;
