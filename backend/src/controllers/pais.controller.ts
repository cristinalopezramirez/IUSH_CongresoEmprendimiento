import PaisDto from "../dtos/pais.dto";
import { Response, Request } from "express";
import PaisRepo from "../repository/pais.repo";




export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let paisDto = new PaisDto(body);
        let paisRepository = new PaisRepo();

        let answ = await paisRepository.create(paisDto);

        res.json({
            ok: true,
            data: answ,
            message: 'País creado con éxito',
            error: null
        });

    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear un pais'
        });
    }
}


export let obtenerPais = async (req: Request, res: Response) => {
    try {
        let paisRepository = new PaisRepo();

        let pais = await paisRepository.obtenerPais();

        res.json({
            ok: true,
            data: pais,
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
