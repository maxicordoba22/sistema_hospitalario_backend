"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEspecialidad = exports.updateEspecialidad = exports.createEspecialidad = exports.getEspecialidades = void 0;
const prisma_1 = require("../prisma");
const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await prisma_1.prisma.especialidades.findMany();
        res.json(especialidades);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener especialidades' });
    }
};
exports.getEspecialidades = getEspecialidades;
const createEspecialidad = async (req, res) => {
    try {
        const { NombreEspecialidad } = req.body;
        if (!NombreEspecialidad)
            return res.status(400).json({ error: 'El nombre es obligatorio' });
        const nuevaEspecialidad = await prisma_1.prisma.especialidades.create({
            data: { NombreEspecialidad }
        });
        res.status(201).json(nuevaEspecialidad);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear especialidad' });
    }
};
exports.createEspecialidad = createEspecialidad;
const updateEspecialidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { NombreEspecialidad } = req.body;
        const especialidad = await prisma_1.prisma.especialidades.update({
            where: { IdEspecialidad: id },
            data: { NombreEspecialidad }
        });
        res.json(especialidad);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar especialidad' });
    }
};
exports.updateEspecialidad = updateEspecialidad;
const deleteEspecialidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.especialidades.delete({ where: { IdEspecialidad: id } });
        res.json({ mensaje: `Especialidad eliminada` });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar especialidad' });
    }
};
exports.deleteEspecialidad = deleteEspecialidad;
