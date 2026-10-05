"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const roles_routes_1 = __importDefault(require("./routes/roles.routes"));
const pacientes_routes_1 = __importDefault(require("./routes/pacientes.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const especialidades_routes_1 = __importDefault(require("./routes/especialidades.routes"));
const medicos_routes_1 = __importDefault(require("./routes/medicos.routes"));
const turnos_routes_1 = __importDefault(require("./routes/turnos.routes"));
const historiaclinica_routes_1 = __importDefault(require("./routes/historiaclinica.routes"));
const recetas_routes_1 = __importDefault(require("./routes/recetas.routes"));
const horariosatencion_routes_1 = __importDefault(require("./routes/horariosatencion.routes"));
const app = (0, express_1.default)();
const port = 3000;
// Middlewares
app.use(express_1.default.json());
// Rutas de la API (Acá conectamos la carpeta routes)
app.use('/api/roles', roles_routes_1.default);
app.use('/api/pacientes', pacientes_routes_1.default);
app.use('/api/usuarios', usuarios_routes_1.default);
app.use('/api/especialidades', especialidades_routes_1.default); // <-- NUEVO
app.use('/api/medicos', medicos_routes_1.default);
app.use('/api/turnos', turnos_routes_1.default);
app.use('/api/historiaclinica', historiaclinica_routes_1.default);
app.use('/api/recetas', recetas_routes_1.default);
app.use('/api/horariosatencion', horariosatencion_routes_1.default);
// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
