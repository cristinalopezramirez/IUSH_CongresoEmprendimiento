import AdministradorDto from "../dtos/administrador.dto";
import AdministradorRepo from "../repository/administrador.repo";
import { Response, Request } from "express";


export let create = async( req: Request, res: Response) => {
    try {
        let body = req.body;
        let administradorDto = new AdministradorDto(body);
        let administradorRepository = new AdministradorRepo();
        let answ = await administradorRepository.create(administradorDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Administrador creado con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear un administrador'
        });
    }
}

export let obtener = async (req: Request, res: Response) => {
    try {
        let administradorRepository = new AdministradorRepo();
        let administrador = await administradorRepository.obtener();
        res.json({
            ok: true,
            data: administrador,
            message: 'Todo ok',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'ocurrió un problema al traer informacion administrador'
        })
    }
}

export let loginAdministrador = async( req:Request, res: Response) => {
    const documentoIdentidad = req.params.documentoIdentidad;
    const correo = req.params.correo;
    let login = true;
    try {
        let administradorRepo = new AdministradorRepo();
        let administrador = await administradorRepo.loginAdministrador(String(documentoIdentidad), String(correo));
        if (administrador.length == 0) {
            login = false
        }
        res.json({
            ok: true,
            data: login,
            message: 'OK - Login administrador por documento/correo',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Búsqueda de administrador por documento/correo'
        })
    }
}
