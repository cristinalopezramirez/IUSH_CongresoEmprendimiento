import EvaluadorDto from "../dtos/evaluadores.dto";
import EvaluadorRepo from "../repository/evaluadores.repo";
import { Response, Request } from "express";
import SectorEmprendimientoRepo from "../repository/sectorEmprendimiento.repo";
import { AnyKeys } from "mongoose";


export let create = async( req: Request, res: Response) => {
    try {
        let body = req.body;
        let evaluadorDto = new EvaluadorDto(body);
        let evaluadorRepository = new EvaluadorRepo();
        let answ = await evaluadorRepository.create(evaluadorDto);
        res.json({
            ok: true,
            data: answ,
            message: 'Evaluador creado con éxito',
            error: null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear un evaluador'
        });
    }
}

export let obtener = async (req: Request, res: Response) => {
    try {
        let evaluadorRepository = new EvaluadorRepo();
        let evaluador = await evaluadorRepository.obtener();
        res.json({
            ok: true,
            data: evaluador,
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

export let obtenerEvaluadoresPorPais = async (req: Request, res: Response) => {
    const idPais = req.params.idPais;
    try {
        let evaluadorRepo = new EvaluadorRepo();
        let evaluador = await evaluadorRepo.obtenerEvaluadoresPorPais(String(idPais));
        res.json({
            ok: true,
            data: evaluador,
            message: 'Búsqueda de evaluadores por pais exitosa',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer evaluadores por pais'
        })
    }
}

export let loginEvaluador = async( req:Request, res: Response) => {
    const documentoIdentidad = req.params.documentoIdentidad;
    const correo = req.params.correo;
    let login = true;
    try {
        let evaluadorRepo = new EvaluadorRepo();
        let evaluador = await evaluadorRepo.loginEvaluador(String(documentoIdentidad), String(correo));
        if (evaluador.length == 0) {
            login = false
        }
        res.json({
            ok: true,
            data: login,
            message: 'OK - Login evaluador por documento/correo',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Búsqueda de evaluador por documento/correo'
        })
    }
}

export let listarProyectosNoAsociados = async (req: Request, res: Response) => {
    const idEvaluador = req.params.idEvaluador;
    let sector: any;
    let respuesta : any;
    let objetosFiltrados: any;
    
    try {
        let evaluadorRepo = new EvaluadorRepo();
        const sectorEmprendimiento = new SectorEmprendimientoRepo();
        sector = await sectorEmprendimiento.obtenerSectorEmprendimiento();
        console.log(sector);
        
        let proyectos = await evaluadorRepo.listarProyectosNoAsociados(String(idEvaluador));
        const opciones = ["Idea", "Desarrollo", "Lanzamiento Temprano"];
        respuesta = proyectos[0];
        if (respuesta["proyectosNoAsociados"].length > 0 ) {
            objetosFiltrados = respuesta.proyectosNoAsociados.filter((proyecto: any) => opciones.includes(proyecto.estado));
        }

        res.json({
            ok: true,
            data: objetosFiltrados,
            message: 'OK - Búsqueda de proyectos no asociados a la IES del evaluador y que están en etapa de ideación, desarrollo o lanzamiento temprano',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error en Búsqueda de proyectos no asociados a la IES del evaluador'
        })
    }
}