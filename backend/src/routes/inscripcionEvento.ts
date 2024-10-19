import { Router } from "express";
import * as controller from "../controllers/inscripcionEvento.controller";

const inscripcionEventoRoutes = Router();

inscripcionEventoRoutes.post('/crear',  controller.create);
inscripcionEventoRoutes.post('/confirmarAsistenciaEvento', controller.confirmarAsistenciaEvento);

inscripcionEventoRoutes.get('/obtener', controller.obtener);
inscripcionEventoRoutes.get('/verificarInscripcionEvento/:correo', controller.verificarTipoInscripcion)


export default inscripcionEventoRoutes;