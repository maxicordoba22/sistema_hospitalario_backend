"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controller_1 = require("../controllers/roles.controller");
const router = (0, express_1.Router)();
// Ya no hace falta poner '/api/roles' acá, lo definiremos en el index
router.get('/', roles_controller_1.getRoles);
router.post('/', roles_controller_1.createRol);
router.put('/:id', roles_controller_1.updateRol);
router.delete('/:id', roles_controller_1.deleteRol);
exports.default = router;
