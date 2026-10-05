import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import 'dotenv/config';

const adapter = new PrismaMssql({
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
export const prisma = new PrismaClient({ adapter });