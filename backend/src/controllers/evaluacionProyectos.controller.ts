import EvaluacionProyectosDto from "../dtos/evaluacionProyectos.dto";
import EvaluacionProyectosRepo from "../repository/evaluacionProyectos.repo";
import { Response, Request } from "express";

export let create = async( req: Request, res: Response) => {
    try {
        let body = req.body;
        let acum = 0;
        let num = 0;

        for(let i=0;i<body["evaluacion"].length; i++){
            for(let j=0; j<body["evaluacion"][0]["preguntas"].length; j++){
                acum = acum + Number(body["evaluacion"][i]["preguntas"][j]["puntaje"]);
                num ++;
            }
        }
        body.promedio = acum / num;

        let evaluacionProyectosDto = new EvaluacionProyectosDto(body);
        let evaluacionProyectosRepository = new EvaluacionProyectosRepo();
        let answ = await evaluacionProyectosRepository.create(evaluacionProyectosDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Registro evaluación creada con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al registrar evaluación: no se creó el registro o la evaluación ya fue registrada'
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

export let listarProyectosEvaludados = async (req: Request, res: Response) => {
    try {
        let evaluacionProyectos = new EvaluacionProyectosRepo();
        let proyectosEvaluados = await evaluacionProyectos.listarProyectosEvaludados();
        res.json({
            ok: true,
            data: proyectosEvaluados,
            message: 'Proyectos evaluados listados correctamente',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al listar los proyectos evaluados'
        })
    }
}