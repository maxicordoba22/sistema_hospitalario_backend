"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuarios = void 0;
const prisma_1 = require("../prisma");
// GET: Leer todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma_1.prisma.usuarios.findMany();
        res.json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
exports.getUsuarios = getUsuarios;
// POST: Crear un nuevo usuario
const createUsuario = async (req, res) => {
    try {
        const { Email, PasswordHash, IdRol, Activo } = req.body;
        // Validamos campos obligatorios según tu schema
        if (!Email || !PasswordHash || !IdRol) {
            return res.status(400).json({ error: 'Email, PasswordHash e IdRol son obligatorios' });
        }
        const nuevoUsuario = await prisma_1.prisma.usuarios.create({
            data: {
                Email,
                PasswordHash,
                IdRol,
                Activo
            }
        });
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};
exports.createUsuario = createUsuario;
// PUT: Actualizar un usuario
const updateUsuario = async (req, res) => {
    try {
        // IMPORTANTE: Como IdUsuario es String (UUID), NO usamos parseInt()
        const id = req.params.id;
        const { Email, PasswordHash, IdRol, Activo } = req.body;
        const usuarioActualizado = await prisma_1.prisma.usuarios.update({
            where: { IdUsuario: id },
            data: {
                Email,
                PasswordHash,
                IdRol,
                Activo
            }
        });
        res.json(usuarioActualizado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
exports.updateUsuario = updateUsuario;
// DELETE: Borrar un usuario
const deleteUsuario = async (req, res) => {
    try {
        // Nuevamente, tomamos el id como String
        const id = req.params.id;
        await prisma_1.prisma.usuarios.delete({
            where: { IdUsuario: id }
        });
        res.json({ mensaje: `Usuario eliminado correctamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
exports.deleteUsuario = deleteUsuario;
