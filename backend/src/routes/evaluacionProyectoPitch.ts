import { Router } from "express";
import * as controller from "../controllers/evaluacionEtapaPitch.controller";

const evaluacionEtapaPitchRoutes = Router();

evaluacionEtapaPitchRoutes.post('/crear', controller.create);
evaluacionEtapaPitchRoutes.get('/obtener', controller.obtener);
evaluacionEtapaPitchRoutes.get('/resultadosPitch', controller.resultadosPitch);

export default evaluacionEtapaPitchRoutes;