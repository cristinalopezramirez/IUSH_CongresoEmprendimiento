import InstitucionesEducativasDto from "../dtos/institucionesEducativas.dto";
import InstitucionesEducativasRepo from "../repository/institucionesEducativas.repo";
import { Response, Request } from "express";
import PaisRepo from "../repository/pais.repo";


export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let institucionesEducativasDto = new InstitucionesEducativasDto(body);
        let institucionesEducativasRepository = new InstitucionesEducativasRepo();

        let answ = await institucionesEducativasRepository.create(institucionesEducativasDto);

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
            message: 'Error al crear un test'
        });
    }
}


export let obtenerInstitucionesEducativas = async (req: Request, res: Response) => {
    try {
        let institucionesEducativasRepository = new InstitucionesEducativasRepo();
        let institucionesEducativas = await institucionesEducativasRepository.obtener();
        res.json({
            ok: true,
            data: institucionesEducativas,
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


export let obtenerIESPorPais = async (req: Request, res: Response) => {
    const idPais = req.params.idPais;
    try {
        let institucionesEducativasRepo = new InstitucionesEducativasRepo();
        let institucionesEducativas = await institucionesEducativasRepo.obtenerIESPorPais(String(idPais));
        res.json({
            ok: true,
            data: institucionesEducativas,
            message: 'Búsqueda de IES por pais exitosa',
            error: null
        })
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al traer IES por pais'
        })
    }
}
/*
export let registroMasivoIES = async (req: Request, res: Response) => {
    const paisesRepo = new PaisRepo();
    console.log(req.body);
    
    try {
        if(!req.files) {
            return res.status(400).json({
                ok: false,
                message: 'No se cargaron archivos'
            })
        }

        let archivoEjemplo: any = req.files;
        let datosString = archivoEjemplo.data.toString();
        let lineas = datosString.split('\n');   

        for (let indiceLines = 1; indiceLines<lineas.length; indiceLines++) {
            const linea = lineas[indiceLines];
            let datosArray: string[] = linea.split(';');
            let pais: any;

            try {
                pais = await paisesRepo.ubicarUniversidadEnPais(String(datosArray[0]));
                const iesDto = new InstitucionesEducativasDto({
                    nombre: datosArray[1],
                    paisIES: pais[0]._id
                });
                const nuevaIES = await new InstitucionesEducativasRepo().create(iesDto)
            } catch (error) {
                
            }
        }

        res.json({
            ok: true,
            data: "",
            message: 'Registro masivo de IES completado con éxito'
        });

    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al hacer registro masivo de IES'
        });
    }
}
*/
