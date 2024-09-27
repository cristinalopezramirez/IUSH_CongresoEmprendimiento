import EvaluacionProyectosDto from "../dtos/evaluacionProyectos.dto";
import EvaluacionProyectosRepo from "../repository/evaluacionProyectos.repo";
import { Response, Request } from "express";

export let create = async( req: Request, res: Response) => {
    try {
        let body = req.body;
        let evaluacionProyectosDto = new EvaluacionProyectosDto(body);
        let evaluacionProyectosRepository = new EvaluacionProyectosRepo();
        let answ = await evaluacionProyectosRepository.create(evaluacionProyectosDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Creado con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear un nuevo emprendimiento'
        });
    }
}

export let obtener = async( req: Request, res: Response) => {
    try {
        let evaluacionProyectosRepository = new EvaluacionProyectosRepo();
        let evaluacion = await evaluacionProyectosRepository.obtener();
        res.json({
            ok: true,
            data: evaluacion,
            message: 'Todo ok',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'ocurrió un problema al traer los datos'
        })
    }
}