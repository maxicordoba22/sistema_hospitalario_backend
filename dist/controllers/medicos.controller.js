"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedico = exports.updateMedico = exports.createMedico = exports.getMedicos = void 0;
const prisma_1 = require("../prisma");
const getMedicos = async (req, res) => {
    try {
        const medicos = await prisma_1.prisma.medicos.findMany();
        res.json(medicos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener medicos' });
    }
};
exports.getMedicos = getMedicos;
const createMedico = async (req, res) => {
    try {
        const { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad } = req.body;
        if (!IdUsuario || !Nombre || !Apellido || !Matricula || !IdEspecialidad) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const nuevoMedico = await prisma_1.prisma.medicos.create({
            data: { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad }
        });
        res.status(201).json(nuevoMedico);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear medico' });
    }
};
exports.createMedico = createMedico;
const updateMedico = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad } = req.body;
        const medico = await prisma_1.prisma.medicos.update({
            where: { IdMedico: id },
            data: { IdUsuario, Nombre, Apellido, Matricula, IdEspecialidad }
        });
        res.json(medico);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar medico' });
    }
};
exports.updateMedico = updateMedico;
const deleteMedico = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.medicos.delete({ where: { IdMedico: id } });
        res.json({ mensaje: `Medico eliminado` });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar medico' });
    }
};
exports.deleteMedico = deleteMedico;
