"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRoles = void 0;
const prisma_1 = require("../prisma"); // Importamos tu conexión centralizada
const getRoles = async (req, res) => {
    try {
        const roles = await prisma_1.prisma.roles.findMany();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener roles' });
    }
};
exports.getRoles = getRoles;
const createRol = async (req, res) => {
    try {
        const { NombreRol } = req.body;
        if (!NombreRol)
            return res.status(400).json({ error: 'Falta NombreRol' });
        const nuevoRol = await prisma_1.prisma.roles.create({ data: { NombreRol } });
        res.status(201).json(nuevoRol);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear rol' });
    }
};
exports.createRol = createRol;
const updateRol = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { NombreRol } = req.body;
        const rolActualizado = await prisma_1.prisma.roles.update({
            where: { IdRol: id },
            data: { NombreRol }
        });
        res.json(rolActualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar rol' });
    }
};
exports.updateRol = updateRol;
const deleteRol = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.roles.delete({ where: { IdRol: id } });
        res.json({ mensaje: `Rol eliminado correctamente` });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar rol' });
    }
};
exports.deleteRol = deleteRol;
