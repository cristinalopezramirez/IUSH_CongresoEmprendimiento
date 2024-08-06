import { Router } from "express";
import * as controller from "../controllers/administrador.controller";

const administradorRoutes = Router();

administradorRoutes.post('/crear', controller.create);
administradorRoutes.get('/obtener', controller.obtener);
administradorRoutes.get('/loginAdministrador/:documentoIdentidad/:correo', controller.loginAdministrador);

export default administradorRoutes;