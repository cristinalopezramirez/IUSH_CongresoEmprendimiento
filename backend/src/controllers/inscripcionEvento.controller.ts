import InscripcionEventoDto from "../dtos/inscripcionEvento.dto";
import InscripcionEventoRepo from "../repository/inscripcionEvento.repo";
import { Response, Request } from "express";

export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let inscripcionEventoDto = new InscripcionEventoDto(body);
        let InscripcionEventoRepository = new InscripcionEventoRepo();
        let answ = await InscripcionEventoRepository.create(inscripcionEventoDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Inscripción creada con éxito',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear registro de inscripción al evento'
        });
    }
}

export let obtener =  async (req: Request, res: Response) => {
    try {
        let InscripcionEventoRepository = new InscripcionEventoRepo();
        let inscripcionEvento = await InscripcionEventoRepository.obtener();
        res.json({
            ok: true,
            data: inscripcionEvento,
            message: 'Todo ok',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer los datos de inscritos al evento'
        })
    }
}
