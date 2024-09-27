import { Router } from "express";
import * as controller from "../controllers/excelService.controller";

const excelServiceRoutes = Router();


excelServiceRoutes.get('/obtener', controller.obtener);
excelServiceRoutes.get('/obtenerEvaluadores', controller.obtenerEvaluadores);
excelServiceRoutes.get('/obtenerEmprendimientos', controller.obtenerEmprendimientos);
excelServiceRoutes.get('/obtenerInscritosEvento', controller.obtenerInscritosEvento);
excelServiceRoutes.get('/obtenerUniversidades', controller.obtenerUniversidades);


export default excelServiceRoutes;