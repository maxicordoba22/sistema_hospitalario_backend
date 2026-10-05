"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReceta = exports.updateReceta = exports.createReceta = exports.getRecetas = void 0;
const prisma_1 = require("../prisma");
const getRecetas = async (req, res) => {
    try {
        const recetas = await prisma_1.prisma.recetas.findMany();
        res.json(recetas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recetas' });
    }
};
exports.getRecetas = getRecetas;
const createReceta = async (req, res) => {
    try {
        const { IdEvolucion, Medicamento, Indicaciones } = req.body;
        if (!IdEvolucion || !Medicamento || !Indicaciones) {
            return res.status(400).json({ error: 'IdEvolucion, Medicamento e Indicaciones son obligatorios' });
        }
        const nuevaReceta = await prisma_1.prisma.recetas.create({
            data: {
                IdEvolucion,
                Medicamento,
                Indicaciones
            }
        });
        res.status(201).json(nuevaReceta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear receta' });
    }
};
exports.createReceta = createReceta;
const updateReceta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { IdEvolucion, Medicamento, Indicaciones } = req.body;
        const recetaActualizada = await prisma_1.prisma.recetas.update({
            where: { IdReceta: id },
            data: { IdEvolucion, Medicamento, Indicaciones }
        });
        res.json(recetaActualizada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar receta' });
    }
};
exports.updateReceta = updateReceta;
const deleteReceta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.recetas.delete({ where: { IdReceta: id } });
        res.json({ mensaje: `Receta eliminada correctamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar receta' });
    }
};
exports.deleteReceta = deleteReceta;
