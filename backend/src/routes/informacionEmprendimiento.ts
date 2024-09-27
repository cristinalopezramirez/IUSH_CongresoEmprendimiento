import { Router } from "express";
import * as controller from "../controllers/informacionEmprendimiento.controller";

const informacionEmprendimientoRoutes = Router();

informacionEmprendimientoRoutes.post('/crear', controller.create);
informacionEmprendimientoRoutes.post('/actualizarPorId', controller.actualizarPorId);

informacionEmprendimientoRoutes.get('/obtener', controller.obtener);
informacionEmprendimientoRoutes.get('/obtenerPorIdEmprendedor/:idEmprendedor', controller.obtenerPorIdEmprendedor);
informacionEmprendimientoRoutes.get('/obtenerPorIdSector/:idSector', controller.obtenerPorIdSector);

// Consultas para la generación de informes
informacionEmprendimientoRoutes.get('/numeroEmprendimientos', controller.numeroEmprendimientos);
informacionEmprendimientoRoutes.get('/numeroEmprendimientosPorSector', controller.numeroEmprendimientosPorSector);
informacionEmprendimientoRoutes.get('/numeroEmprendimientosPorEstado', controller.numeroEmprendimientosPorEstado);
informacionEmprendimientoRoutes.get('/numeroEmprendimientosPorPais', controller.numeroEmprendimientosPorPais);
informacionEmprendimientoRoutes.get('/numeroEmprendimientosPorIES', controller.numeroEmprendimientosPorIES);


export default informacionEmprendimientoRoutes;