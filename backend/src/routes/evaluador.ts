import { Router } from "express";
import * as controller from "../controllers/evaluador.controller";

const evaluadorRoutes = Router();

evaluadorRoutes.post('/crear', controller.create);
evaluadorRoutes.get('/obtener', controller.obtener);
evaluadorRoutes.get('/listarProyectosNoAsociados/:idEvaluador', controller.listarProyectosNoAsociados);
evaluadorRoutes.get('/loginEvaluador/:documentoIdentidad/:correo', controller.loginEvaluador);

export default evaluadorRoutes;