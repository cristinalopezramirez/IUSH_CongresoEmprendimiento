import { Router, Request, Response } from "express";
import * as controller from "../controllers/pais.controller";


const paisRoutes = Router();


paisRoutes.post('/crear', controller.create);
paisRoutes.get('/obtener', controller.obtenerPais);


export default paisRoutes;




