import { Router } from "express";
import * as controller from "../controllers/evaluacionProyectos.controller";

const evaluacionProyectosRoutes = Router();

evaluacionProyectosRoutes.post('/crear', controller.create);
evaluacionProyectosRoutes.get('/obtener', controller.obtener);
evaluacionProyectosRoutes.get('/listarProyectosEvaluados', controller.listarProyectosEvaludados);

export default evaluacionProyectosRoutes;