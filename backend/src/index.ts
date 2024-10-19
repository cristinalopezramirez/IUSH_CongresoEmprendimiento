import Server from "./classes/server";
import mongoose from "mongoose";
import cors from "cors";
import express from 'express';
import colors from "colors";
import * as dotenv from 'dotenv';

import testRoutes from "./routes/test";
import sectorEmprendimientoRoutes from "./routes/sectorEmprendimiento";
import informacionGeneralRoutes from "./routes/informacionGeneral";
import informacionEmprendimientoRoutes from "./routes/informacionEmprendimiento";
import paisRoutes from "./routes/pais";
import institucionesEducativasRoutes from "./routes/institucionesEducativas";
import preguntasRoutes from "./routes/preguntas";
import evaluadorRoutes from "./routes/evaluador";
import asignarEvaluadorEmprendimientoRoutes from "./routes/asignarEvaluadorEmprendimiento";
import administradorRoutes from "./routes/administrador";
import inscripcionEventoRoutes from "./routes/inscripcionEvento";
import excelServiceRoutes from "./routes/excelService";
import evaluacionProyectosRoutes from "./routes/evaluacionProyectos";
import etapaPitchRoutes from "./routes/etapaPitch";
import evaluacionEtapaPitchRoutes from "./routes/evaluacionProyectoPitch";

dotenv.config();

if (!process.env.PORT) {
    console.error("No PORT environment variable found");
    process.exit(1);
}

const port: number = parseInt(process.env.PORT);

const server = new Server(port);
colors.enable();

// Body parser
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());

server.app.use(cors({
    origin: '*'
}));

// Rutas de la app
server.app.use('/test', testRoutes);
server.app.use('/sectorEmprendimiento', sectorEmprendimientoRoutes);
server.app.use('/informacionGeneral', informacionGeneralRoutes);
server.app.use('/pais', paisRoutes);
server.app.use('/institucionesEducativas', institucionesEducativasRoutes);
server.app.use('/preguntas', preguntasRoutes);
server.app.use('/informacionEmprendimiento', informacionEmprendimientoRoutes);
server.app.use('/evaluador', evaluadorRoutes);
server.app.use('/asignarEvaluador', asignarEvaluadorEmprendimientoRoutes);
server.app.use('/administrador', administradorRoutes);
server.app.use('/inscripcionEvento', inscripcionEventoRoutes);
server.app.use('/excelService', excelServiceRoutes);
server.app.use('/evaluacionProyectos', evaluacionProyectosRoutes);
server.app.use('/etapaPitch', etapaPitchRoutes);
server.app.use('/evaluacionEtapaPitch', evaluacionEtapaPitchRoutes);

// Conexión de Base de datos
const URI = process.env.MONGODB_URL as string;

if (!URI) {
    console.error("No MONGODB_URL environment variable found");
    process.exit(1);
}

console.log(`Conectando a MongoDB en ${URI}`);

mongoose.connect(URI)
    .then(() => {
        console.log("\n*****************************".bgGreen);
        console.log("Mongo conectado correctamente".italic.green);
        console.log("*****************************\n".bgGreen);
    })
    .catch((err: any) => {
        console.log("\n****************************".bgRed);
        console.log("Mongo no se pudo conectar".red);
        console.log("****************************\n".bgRed);
        console.log(err);
        throw err;
    });

// Levantar express
server.start(() => {
    console.log(`\n \nServidor corriendo en el puerto ${server.port}`.italic.grey);
});
