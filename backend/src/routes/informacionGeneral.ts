import { Router, Request, Response } from "express";
import * as controller from "../controllers/informacionGeneral.controller";


const informacionGeneralRoutes = Router();


informacionGeneralRoutes.post('/crear', controller.create);
informacionGeneralRoutes.get('/obtenerInformacionGeneral', controller.obtenerInformacionGeneral);
informacionGeneralRoutes.get('/obtenerPorDocumento/:documentoIdentidad', controller.obtenerPorDocumento);

export default informacionGeneralRoutes;
