import { Response, Request } from "express";
import EtapaPitchDto from "../dtos/etapaPitch.dto";
import EtapaPitchRepo from "../repository/etapaPitch.repo";
import exp from "constants";


export let create = async(req: Request, res: Response) => {
    try {
        let body = req.body;
        let infoDto = new EtapaPitchDto(body);
        let infoRepository = new EtapaPitchRepo();
        let answ = await infoRepository.create(infoDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Información proyecto en etapa pitch creado con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear información proyecto en etapa pitch'
        });
    }
}

export let obtener = async ( req: Request, res: Response) => {
    try {
        let proyectosPitchRepo = new EtapaPitchRepo();
        let proyectosPitch = await proyectosPitchRepo.obtener();
        res.json({
            ok: true,
            data: proyectosPitch,
            message: 'Proyectos en etapa pitch obtenidos con éxito',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear obtener proyectos en etapa pitch'
        });
    }
}

export let crearEnBloque = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        console.log(body.length);
        let results: any[] = [];
        for (let i = 0; i < body.length; i++) {
            try {
                let infoDto = new EtapaPitchDto(body[i]);
                let infoRepository = new EtapaPitchRepo();
                let answ = await infoRepository.create(infoDto);
                results.push({
                    ok: true,
                    data: answ,
                    message: `Información del proyecto en etapa pitch creada con éxito (Índice ${i})`,
                    error: null
                });
            } catch (error) {
                results.push({
                    ok: false,
                    error: error instanceof Error ? error.message : error,
                    message: `Error al crear información del proyecto en etapa pitch (Índice ${i})`
                });
            }
        }
        res.json(results);
    } catch (error) {
        res.json({
            ok: false,
            error: error instanceof Error ? error.message : error,
            message: 'Error al almacenar la información de varios proyectos en etapa pitch'
        });
    }
}

