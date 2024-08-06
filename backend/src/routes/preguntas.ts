import { Router } from "express";
import * as controller from "../controllers/preguntas.controller";

const preguntasRoutes = Router();

preguntasRoutes.post('/crear', controller.create);
preguntasRoutes.get('/obtenerPreguntas', controller.obtenerPreguntas);
preguntasRoutes.get('/obtenerPreguntasPorYear/:year', controller.preguntasPorYear);


export default preguntasRoutes;