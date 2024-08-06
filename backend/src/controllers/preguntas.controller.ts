import PreguntasDto from "../dtos/preguntas.dto";
import PreguntasRepo from "../repository/preguntas.repo";
import { Response, Request } from "express";

export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let preguntasDto = new PreguntasDto(body);
        let preguntasRepository = new PreguntasRepo();
        let answ = await preguntasRepository.create(preguntasDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Pregunta creada con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear pregunta'
        });
    }
}

export let obtenerPreguntas = async (req: Request, res: Response) => {
    try {
        let preguntasRepository = new PreguntasRepo();
        let preguntas = await preguntasRepository.obtener();
        res.json({
            ok: true,
            data: preguntas,
            message: 'Todo ok',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'ocurrió un problema al leer las preguntas'
        })
    }
}

export let preguntasPorYear = async (req: Request, res: Response) => {
    const year = req.params.year;
    try {
        let preguntasRepo = new PreguntasRepo();
        let preguntas = await preguntasRepo.obtenerPorYear(Number(year));
        res.json({
            ok: true,
            data: preguntas,
            message: 'Búsqueda de preguntas por año exitosa',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'ocurrió un problema al traer preguntas por año'
        })
    }
}