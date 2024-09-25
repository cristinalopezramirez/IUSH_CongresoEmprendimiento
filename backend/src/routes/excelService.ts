import { Router } from "express";
import * as controller from "../controllers/excelService.controller";

const excelServiceRoutes = Router();


excelServiceRoutes.get('/obtener', controller.obtener);



export default excelServiceRoutes;