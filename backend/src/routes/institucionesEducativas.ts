import { Router, Request, Response } from "express";
import * as controller from "../controllers/institucionesEducativas.controller";


const institucionesEducativasRoutes = Router();


institucionesEducativasRoutes.post('/crear', controller.create);
institucionesEducativasRoutes.get('/obtenerInstitucionesEducativas', controller.obtenerInstitucionesEducativas);
institucionesEducativasRoutes.get('/obtenerIESPorPais/:idPais', controller.obtenerIESPorPais);
//institucionesEducativasRoutes.post('/registroMasivoIES', controller.registroMasivoIES);


export default institucionesEducativasRoutes;




            
