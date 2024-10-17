import { Router } from "express";
import * as controller from "../controllers/inscripcionEvento.controller";

const inscripcionEventoRoutes = Router();

inscripcionEventoRoutes.post('/crear',  controller.create);
inscripcionEventoRoutes.get('/obtener', controller.obtener);
inscripcionEventoRoutes.get('/verificarInscripcionEvento/:correo', controller.verificarTipoInscripcion)
inscripcionEventoRoutes.get('/confirmarAsistenciaEvento/:correo', controller.confirmarAsistenciaEvento);


export default inscripcionEventoRoutes;