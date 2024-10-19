import { log } from "console";
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

export let verificarTipoInscripcion = async (req: Request, res: Response) => {
    const correo = req.params.correo;
    try {
        let InscripcionEventoRepository = new InscripcionEventoRepo();
        let verificarInscripcionEvento = await InscripcionEventoRepository.verificarTipoInscripcion(correo);
        let datos = verificarInscripcionEvento.length != 0 ? verificarInscripcionEvento[0] : null;
        let texto = verificarInscripcionEvento.length != 0 ? "La persona está inscrita como Invitado Especial" : "La persona no está inscrita como Invitado Especial";
        res.json({
            ok:true,
            data: datos,
            message: texto,
            error:null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al verificar el correo'
        })
    }
}

export let confirmarAsistenciaEvento = async (req: Request, res: Response) => {
    const correo = req.body.correo;  
    const telefono = req.body.telefono;
    let tipoAsistente = "";  
    console.log(correo, " y ", telefono);
    
    try {
        let InscripcionEventoRepository = new InscripcionEventoRepo();
        let confirmarAsistenciaEvento = await InscripcionEventoRepository.confirmarAsistenciaEvento(correo);
        console.log(confirmarAsistenciaEvento);
        if (confirmarAsistenciaEvento.length>0){
            if (confirmarAsistenciaEvento[0].tipoAsistente == "INVITADO ESPECIAL (INVITADO EXTRANJERO, ORGANIZADOR Y ALIADO ESTRATÉGICO)"){
                tipoAsistente = "INVITADO ESPECIAL"
            } else {
                tipoAsistente = confirmarAsistenciaEvento[0].tipoAsistente
            }
        } else {
            tipoAsistente = "USTED NO ESTÁ REGISTRADO, VERIFIQUE SU CORREO Y/O REALICE LA INSCRIPCIÓN"
        }
        let datos = {
            "titulo": tipoAsistente,
            "mensaje": "Bienvenido al Congreso Iberoamericano de Universidades"
        };
        let actualizar = {
            "id": confirmarAsistenciaEvento[0]["_id"],
            "telefono": telefono,
            "confirmaAsistencia": true
        }
        console.log("Actualizar: ",actualizar);
        
        await InscripcionEventoRepository.actualizarPorId(actualizar.id, actualizar);
        res.json({
            ok:true,
            data: datos,
            message: "Confirmación asistencia exitosa",
            error:null
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Ocurrió un problema al confirmar asistencia al evento: verifique el correo y/o haga la inscripción'
        })
    }
}
