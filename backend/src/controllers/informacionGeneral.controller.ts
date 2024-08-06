import InformacionGeneralDto from "../dtos/informacionGeneral.dto";
import InformacionGeneralRepo from "../repository/informacionGeneral.repo";
import { Response, Request } from "express";


export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let informacionGeneralDto = new InformacionGeneralDto(body);
        let InformacionGeneralRepository = new InformacionGeneralRepo();
        let answ = await InformacionGeneralRepository.create(informacionGeneralDto);
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
            message: 'Error al crear un informacion General'
        });
    }
}


export let obtenerInformacionGeneral = async (req: Request, res: Response) => {
    try {
        let InformacionGeneralRepository = new InformacionGeneralRepo();
        let informacionGeneral = await InformacionGeneralRepository.obtenerInformacionGeneral();
        res.json({
            ok: true,
            data: informacionGeneral,
            message: 'Todo ok',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer los datos'
        })
    }
}

export let obtenerPorDocumento = async(req: Request, res: Response) => {
    const documentoIdentidad = req.params.documentoIdentidad;
    try {
        let informacionGeneralRepo = new InformacionGeneralRepo();
        let infoPorDocumento = await informacionGeneralRepo.obtenerPorDocumento(String(documentoIdentidad));
        res.json({
            ok: true,
            data: infoPorDocumento,
            message: 'Búsqueda de IES por pais exitosa',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer los datos'
        })
    }
}

