import InscripcionEventoDto from "../dtos/inscripcionEvento.dto";
import { InscripcionEvento } from "../models/inscripcionEvento.model";

class InscripcionEventoRepo {

    async create ( inscripcionEventoDto: InscripcionEventoDto): Promise<InscripcionEventoDto> {
        try {
            let inscripcionEventoModel = new InscripcionEvento({
                nombres: inscripcionEventoDto.getNombres(),
                apellidos: inscripcionEventoDto.getApellidos(),
                correo: inscripcionEventoDto.getCorreo(),
                telefono: inscripcionEventoDto.getTelefono(),
                pais: inscripcionEventoDto.getPais(),
                ciudad: inscripcionEventoDto.getCiudad(),
                tipoAsistente: inscripcionEventoDto.getTipoAsistente(),
                interesesEvento: inscripcionEventoDto.getInteresesEvento(),
                comoTeEnterasteEvento: inscripcionEventoDto.getComoTeEnterasteEvento(),
                aceptaEnvioComunicacion: inscripcionEventoDto.getAceptarEnvioComunicacion(),
                aceptaTerminosYCondicionesTratamientoDatos: inscripcionEventoDto.getAceptaTerminosYCondicionesTratamientoDatos(),
                confirmaAsistencia: inscripcionEventoDto.getConfirmaAsistencia()
            })
            let createdDocument = await InscripcionEvento.create(inscripcionEventoModel);
            let createdTestDocument: InscripcionEventoDto = new InscripcionEventoDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async obtener(): Promise<InscripcionEventoDto[]>{
        try {
            let inscripcionEventoArray = await InscripcionEvento.aggregate([
                {
                  $lookup: {
                    from: "paises",
                    localField: "pais",
                    foreignField: "_id",
                    as: "infoPais"
                  }
                },
                {
                  $unwind: {
                    path: "$infoPais"
                  }
                },
                {
                  $project: {
                    _id: 1,
                    nombres: 1,
                    apellidos: 1,
                    correo: 1,
                    telefono: 1,
                    nombrePais: "$infoPais.descripcion",
                    ciudad: 1,
                    tipoAsistente: 1,
                    interesesEvento: 1,
                    comoTeEnterasteEvento: 1,
                    aceptaEnvioComunicacion: 1
                  }
                }
              ]);
            return inscripcionEventoArray;
        } catch (error) {
            return reject(error);
        }
    }
    /*
    async obtener():  Promise<InscripcionEventoDto[]> {
        try {
            let inscripcionEventoArray: InscripcionEventoDto[] = [];
            let docs = await InscripcionEvento.find();
            docs.forEach(( inscripcionEventoDocument : any) => {
                inscripcionEventoArray.push(new InscripcionEventoDto(inscripcionEventoDocument));
            });
            return inscripcionEventoArray;
        } catch (error) {
            return reject (error);
        }
    }
    */

    async verificarTipoInscripcion(correo: string): Promise<any>{
      try {
        let verificacion = await InscripcionEvento.aggregate([
          {
            $match: {
              correo: correo
            }
          },{
            $match: {
              tipoAsistente: "INVITADO ESPECIAL (INVITADO EXTRANJERO, ORGANIZADOR Y ALIADO ESTRATÉGICO)"
            }
          }
        ]);
        return verificacion;
      } catch (error) {
        console.log(error);
            throw error;
      }
    }

    async confirmarAsistenciaEvento (correo: string): Promise<any> {
      try {
        let confirmar = await InscripcionEvento.aggregate([
          {
            $match: {
              correo: correo
            }
          }
        ]);
        return confirmar;
      } catch (error) {
        console.log(error);
            throw error;
      }
    }

    async actualizarPorId(idAsistente: string, infoAsistente: any): Promise<Boolean>{
      try {
          let asistenciaActualizada = await InscripcionEvento.findByIdAndUpdate(idAsistente, {... infoAsistente});
          return true;
      } catch (error) {
          throw new Error("Error al actualizar asistencia al evento")
    
      }
  }


}

export default InscripcionEventoRepo;

function reject(error: unknown): InscripcionEventoDto[] | PromiseLike<InscripcionEventoDto[]> {
    throw new Error("Function not implemented.");
}
