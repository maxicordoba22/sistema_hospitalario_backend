"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_mssql_1 = require("@prisma/adapter-mssql");
require("dotenv/config");
const adapter = new adapter_mssql_1.PrismaMssql({
    server: 'localhost',
    port: 1433,
    database: 'SistemaHospitalario',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
});
// Exportamos esta única instancia para usarla en todo el proyecto
exports.prisma = new client_1.PrismaClient({ adapter });
