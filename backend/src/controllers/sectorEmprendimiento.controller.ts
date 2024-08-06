import SectorEmprendimientoDto from "../dtos/sectorEmprendimiento.dto";
import { Response, Request } from "express";
import SectorEmprendimientoRepo from "../repository/sectorEmprendimiento.repo";




export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let sectorEmprendimientoDto = new SectorEmprendimientoDto(body);
        let sectorEmprendimientoRepository = new SectorEmprendimientoRepo();

        let answ = await sectorEmprendimientoRepository.create(sectorEmprendimientoDto);

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
            message: 'Error al crear un nuevo sector de emprendimiento'
        });
    }


}


export let obtenerSectorEmprendimiento = async (req: Request, res: Response) => {
    try {
        let sectorEmprendimientoRepository = new SectorEmprendimientoRepo();

        let sectorEmprendimiento = await sectorEmprendimientoRepository.obtenerSectorEmprendimiento();

        res.json({
            ok: true,
            data: sectorEmprendimiento,
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