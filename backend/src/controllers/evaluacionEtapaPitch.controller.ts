import { Response, Request } from "express";
import EvaluacionEtapaPitchDto from "../dtos/evaluacionEtapaPitch.dto";
import EvaluacionEtapaPitchRepo from "../repository/evaluacionEtapaPitch.repo";
import { log } from "console";
import exp from "constants";


export let create = async(req: Request, res: Response) => {
    try {
        let body = req.body;
        let acum = 0;
        let num = 0;
        for( let i=0; i<body.evaluacionPitch.length; i++){
            acum = acum + Number(body["evaluacionPitch"][i]["puntaje"]);
            num ++;
        }
        body.promedio = acum / num;
        let evaluacionEtapaPitchDto = new EvaluacionEtapaPitchDto(body);
        let EvaluacionEtapaPitchRepository = new EvaluacionEtapaPitchRepo();
        let answ = await EvaluacionEtapaPitchRepository.create(evaluacionEtapaPitchDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Registro evaluación en etapa pitch creada con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al registrar evaluación de etapa pitch: no se creó el registro o la evaluación en pitch ya fue registrada'
        });
    }
}

export let obtener = async(req: Request, res: Response) => {
    try {
        let resultadosPitchRepo = new EvaluacionEtapaPitchRepo();
        let resultadosPitch = await resultadosPitchRepo.obtener();
        res.json({
            ok: true,
            data: resultadosPitch,
            message: 'Proyectos evaluados en etapa pitch obtenidos con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al obtener los resultados de evaluación de proyectos en etapa pitch'
        });
    }
}

export let resultadosPitch = async(req: Request, res: Response) => {
    try {
        let resultadosPitchRepo = new EvaluacionEtapaPitchRepo();
        let resultadosPitch = await resultadosPitchRepo.resultadosPitch();
        res.json({
            ok: true,
            data: resultadosPitch,
            message: 'Proyectos evaluados en etapa pitch obtenidos con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al obtener los resultados de evaluación de proyectos en etapa pitch'
        });
    }
}