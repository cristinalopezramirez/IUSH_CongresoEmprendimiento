import AsignarEvaluadorEmprendimientoDto from "../dtos/asignarEvaluadorEmprendimiento.dto";
import AsignarEvaluadorEmprendimientoRepo from "../repository/asignarEvaluadorEmprendimiento.repo";
import { Response, Request } from "express";
import InformacionEmprendimientoRepo from "../repository/informacionEmprendimiento.repo";


export let create = async( req: Request, res: Response) => {
    try {
        let body = req.body;
        console.log(body);
        let actualizar: any;
        let asignarEvaluadorEmprendimientoDto = new AsignarEvaluadorEmprendimientoDto(body);
        let AsignarEvaluadorEmprendimientoRepository = new AsignarEvaluadorEmprendimientoRepo();
        let infoEmprendimiento = new InformacionEmprendimientoRepo();
        let answ = await AsignarEvaluadorEmprendimientoRepository.create(asignarEvaluadorEmprendimientoDto);
        for(let i=0; i<body.emprendimientos.length; i++){
            actualizar = {
                'id': body.emprendimientos[i],
                'asignado': true
            }
            infoEmprendimiento.actualizarPorId(actualizar.id, actualizar)
        }
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

export let obtenerPorIdEvaluador = async (req: Request, res: Response) => {
    const idEvaluador = req.params.idEvaluador;
    try {
        const proyectosAsignadosAEvaluador = new AsignarEvaluadorEmprendimientoRepo();
        let proyectosAsignados = await proyectosAsignadosAEvaluador.obtenerPorIdEvaluador(String(idEvaluador));
        res.json({
            ok: true,
            data: proyectosAsignados,
            message: 'OK - Información proyectos asignados a evaluador',
            error: null
        })
    } catch (error: any) {
        res.json({
            ok: false,
            error: error,
            message:'Error al hallar información de los proyectos a evaluar: ' + error.message
        })
    }
}