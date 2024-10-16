import { Router } from "express";
import * as controller from "../controllers/etapaPitch.controller";

const etapaPitchRoutes = Router();

etapaPitchRoutes.post('/crear', controller.create);
etapaPitchRoutes.get('/obtener', controller.obtener);

export default etapaPitchRoutes;