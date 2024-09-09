import { Router } from "express";
import * as controller from "../controllers/inscripcionEvento.controller";

const inscripcionEventoRoutes = Router();

inscripcionEventoRoutes.post('/crear',  controller.create);
inscripcionEventoRoutes.get('/obtener', controller.obtener);


export default inscripcionEventoRoutes;