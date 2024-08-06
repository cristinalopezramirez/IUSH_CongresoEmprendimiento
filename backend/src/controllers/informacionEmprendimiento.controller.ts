import InformacionEmprendimientoDto from "../dtos/informacionEmprendimiento.dto";
import InformacionEmprendimientoRepo from "../repository/informacionEmprendimiento.repo"
import e, { Response, Request } from "express";
import SectorEmprendimientoRepo from "../repository/sectorEmprendimiento.repo";
import PaisRepo from "../repository/pais.repo";
import InstitucionesEducativasRepo from "../repository/institucionesEducativas.repo";



export let create = async( req: Request, res: Response) => {
    try {
        let body= req.body;

        interface EtapaInfo {
            count: number;
            trueCount: number;
            threshold: number;
        }
        interface Conteos {
            [key: string]: EtapaInfo;
        }
        const conteos: Conteos = {
            'Idea': { count: 0, trueCount: 0,threshold: 5 },
            'Desarrollo': { count: 0, trueCount: 0, threshold: 6 },
            'Lanzamiento Temprano': { count: 0, trueCount: 0, threshold: 6 },
            'Crecimiento': { count: 0, trueCount: 0, threshold: 6 },
            'Madurez': { count: 0, trueCount: 0, threshold: 5 },
            'Funcionamiento Óptimo': { count: 0, trueCount: 0, threshold: 5 },
            'Expansión': { count: 0, trueCount: 0, threshold: 6 }
        };

        body.respuestas.forEach((respuesta: any) => {
            if (conteos[respuesta.etapa]) {
              conteos[respuesta.etapa].count++;
              if ( respuesta.respuestaPregunta) {
                conteos[respuesta.etapa].trueCount ++;
              }
            }
        });

        let etapa = "Idea";
        for (let key of Object.keys(conteos)) {
        const stage = conteos[key];
            if (stage.threshold === stage.trueCount) {
                etapa = key;
            } else {
                break;}
        }
        body.estado = etapa;

        let informacionEmprendimientoDto = new InformacionEmprendimientoDto(body);
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();
        let answ = await informacionEmprendimientoRepository.create(informacionEmprendimientoDto);
        
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
            message: 'Error al crear un nuevo emprendimiento'
        });
    }
}

export let obtener = async (req: Request, res: Response) => {
    try {
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();

        let answ = await informacionEmprendimientoRepository.obtener();

        res.json({
            ok: true,
            data: answ,
            message: 'Todo ok',
            error: null
        })

    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'ocurrió un problema al traer los emprendimientos'
        })
    }
}

export let obtenerPorIdEmprendedor = async (req: Request, res: Response) => {
    const idEmprendedor = req.params.idEmprendedor;
    try {
        let informacionEmprendimientoRepo = new InformacionEmprendimientoRepo();
        let emprendimientos = await informacionEmprendimientoRepo.obtenerPorIdEmprendedor(String(idEmprendedor));
        res.json({
            ok: true,
            data: emprendimientos,
            message: 'Búsqueda de emprendimientos por idEmprendedor exitosa',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer emprendimientos por idEmprendedor'
        })
    }
}

export let obtenerPorIdSector = async (req: Request, res: Response) => {
    const idSector = req.params.idSector;
    try {
        let informacionEmprendimientoRepo = new InformacionEmprendimientoRepo();
        let emprendimientos = await informacionEmprendimientoRepo.obtenerPorIdSector(String(idSector));
        res.json({
            ok: true,
            data: emprendimientos,
            message: 'Búsqueda de emprendimientos por idSector exitosa',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer emprendimientos por idSector'
        })
    }
}


// Servicios útiles para la gereración de informes

export let numeroEmprendimientos = async (req: Request, res: Response) => {
    try {
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();
        let numeroEmprendimientos = await informacionEmprendimientoRepository.getCollectionSize();
        let numero = numeroEmprendimientos.length > 0 ? numeroEmprendimientos[0]["count"] : 0;
        res.json({
            ok: true,
            data: numero,
            message: 'OK - Consulta número emprendimientos registrados',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Consulta número emprendimientos registrados'
        })
    }
}

export let numeroEmprendimientosPorSector = async (req: Request, res: Response) => {
    try {
        let emprendimientosPorSector = new Array();
        let cantEmprendimientosPorSector: any;
        let sectores: any;
        let respuesta = {};

        const sectoresRepository = new SectorEmprendimientoRepo();
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();

        sectores = await sectoresRepository.obtenerSectorEmprendimiento();

        for(let i=0; i<sectores.length; i++){
            cantEmprendimientosPorSector = await informacionEmprendimientoRepository.emprendimientosPorSector(sectores[i]._id);
            let valor = cantEmprendimientosPorSector.length > 0 ? cantEmprendimientosPorSector[0]["count"] : 0;
            respuesta = {
                "sector": sectores[i]["sector"],
                "descripcion": sectores[i]["descripcion"],
                "cantidad": valor
            }
            emprendimientosPorSector[i] = respuesta;
        }
        res.json({
            ok: true,
            data: emprendimientosPorSector,
            message: 'OK - Consulta número emprendimientos por sector registrados',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Consulta número emprendimientos por sector registrados'
        })
    }
}

export let numeroEmprendimientosPorEstado = async (req: Request, res: Response) => {
    try {
        let estados = ['Idea','Desarrollo','Lanzamiento Temprano','Crecimiento','Madurez','Funcionamiento Óptimo','Expansión'];
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();
        let emprendimientosPorEstado = new Array();
        let cantEmprendimientosPorEstado: any;
        let respuesta = {};

        for(let i=0; i<estados.length; i++) {
            cantEmprendimientosPorEstado = await informacionEmprendimientoRepository.emprendimientosPorEstado(estados[i]);
            let valor = cantEmprendimientosPorEstado.length > 0 ? cantEmprendimientosPorEstado[0]["count"] : 0;
            respuesta = {
                "estado": estados[i],
                "cantidad": valor
            }
            emprendimientosPorEstado[i] = respuesta;
        }
        res.json({
            ok: true,
            data: emprendimientosPorEstado,
            message: 'OK - Consulta número emprendimientos por estado registrados',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Consulta número emprendimientos por estado registrados'
        })
    }
}

export let numeroEmprendimientosPorPais = async (req: Request, res: Response) => {
    try {
        let paisesRepo = new PaisRepo();
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();
        let emprendimientosPorPais = new Array();
        let respuesta = {};
        let paises: any;
        let cantEmprendimientosPorPais: any;
        paises = await paisesRepo.obtenerPais();
        for(let i=0; i<paises.length; i++) {
            cantEmprendimientosPorPais = await informacionEmprendimientoRepository.emprendimientosPorPais(paises[i]["_id"]);
            let valor = cantEmprendimientosPorPais.length > 0 ? cantEmprendimientosPorPais[0]["count"] : 0;
            respuesta = {
                "nombre": paises[i]["nombre"],
                "descripcion": paises[i]["descripcion"],
                "cantidad": valor
            }
            emprendimientosPorPais[i] = respuesta;
        }
        res.json({
            ok: true,
            data: emprendimientosPorPais,
            message: 'OK - Consulta número emprendimientos registrados por pais',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Consulta número emprendimientos registrados por pais'
        })
    }
}

export let numeroEmprendimientosPorIES = async (req: Request, res: Response) => {
    try {
        let iesRepo = new InstitucionesEducativasRepo();
        let informacionEmprendimientoRepository = new InformacionEmprendimientoRepo();
        let emprendimientosPorIES = new Array();
        let respuesta = {};
        let ies: any;
        let cantidadEmprendimientosPorIES: any;
        ies = await iesRepo.obtener();
        for(let i=0; i<ies.length; i++) {
            cantidadEmprendimientosPorIES = await informacionEmprendimientoRepository.emprendimientosPorIES(ies[i]["_id"]);
            let valor = cantidadEmprendimientosPorIES.length > 0 ? cantidadEmprendimientosPorIES[0]["count"] : 0;
            respuesta = {
                "nombreIES": ies[i]["nombre"],
                "cantidad": valor
            }
            emprendimientosPorIES[i] = respuesta
        }
        res.json({
            ok: true,
            data: emprendimientosPorIES,
            message: 'OK - Consulta número emprendimientos registrados por IES',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error - Consulta número emprendimientos registrados por IES'
        })
    }
}