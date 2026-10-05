import express from 'express';
import 'dotenv/config';
import rolesRoutes from './routes/roles.routes';
import pacientesRoutes from './routes/pacientes.routes';
import usuariosRoutes from './routes/usuarios.routes';
import  especialidadesRoutes  from './routes/especialidades.routes';
import medicosRoutes from './routes/medicos.routes';
import turnosRoutes from './routes/turnos.routes';
import historiaclinicaRoutes from './routes/historiaclinica.routes';
import recetasRoutes from './routes/recetas.routes';
import horariosAtencionRoutes from './routes/horariosatencion.routes';

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Rutas de la API (Acá conectamos la carpeta routes)
app.use('/api/roles', rolesRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/especialidades', especialidadesRoutes); // <-- NUEVO
app.use('/api/medicos', medicosRoutes);
app.use('/api/turnos', turnosRoutes);
app.use('/api/historiaclinica', historiaclinicaRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/horariosatencion', horariosAtencionRoutes);

// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

