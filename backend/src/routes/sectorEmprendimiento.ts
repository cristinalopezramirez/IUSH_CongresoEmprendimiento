import { Router, Request, Response } from "express";
import * as controller from "../controllers/sectorEmprendimiento.controller"

const sectorEmprendimientoRoutes = Router();

sectorEmprendimientoRoutes.post('/crear', controller.create);
sectorEmprendimientoRoutes.get('/obtenerSector', controller.obtenerSectorEmprendimiento);


export default sectorEmprendimientoRoutes;