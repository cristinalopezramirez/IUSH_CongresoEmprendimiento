import AsignarEvaluadorEmprendimientoDto from "../dtos/asignarEvaluadorEmprendimiento.dto";
import AsignarEvaluadorEmprendimientoRepo from "../repository/asignarEvaluadorEmprendimiento.repo";
import { Response, Request } from "express";


export let create = async( req: Request, res: Response) => {
    try {
        let body = req.body;
        let asignarEvaluadorEmprendimientoDto = new AsignarEvaluadorEmprendimientoDto(body);
        let AsignarEvaluadorEmprendimientoRepository = new AsignarEvaluadorEmprendimientoRepo();
        let answ = await AsignarEvaluadorEmprendimientoRepository.create(asignarEvaluadorEmprendimientoDto);
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
            message: 'Error al almacenar evaluador con proyectos a evaluar'
        });
    }
}

export let obtener = async ( req: Request, res: Response) => {
    try {
        let AsignarEvaluadorEmprendimientoRepository = new AsignarEvaluadorEmprendimientoRepo();
        let asignarEvaluadorEmprendimiento = await AsignarEvaluadorEmprendimientoRepository.obtener();
        res.json({
            ok: true,
            data: asignarEvaluadorEmprendimiento,
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