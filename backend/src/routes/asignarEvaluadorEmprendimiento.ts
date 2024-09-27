import { Router } from "express";
import * as controler from "../controllers/asignarEvaluadorEmprendimiento.controller";


const asignarEvaluadorEmprendimientoRoutes = Router();

asignarEvaluadorEmprendimientoRoutes.post('/crear', controler.create);
asignarEvaluadorEmprendimientoRoutes.get('/obtener', controler.obtener);
asignarEvaluadorEmprendimientoRoutes.get('/obtenerPorIdEvaluador/:idEvaluador', controler.obtenerPorIdEvaluador)


export default asignarEvaluadorEmprendimientoRoutes;