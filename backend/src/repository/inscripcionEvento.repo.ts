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
                aceptaTerminosYCondicionesTratamientoDatos: inscripcionEventoDto.getAceptaTerminosYCondicionesTratamientoDatos()
            })
            let createdDocument = await InscripcionEvento.create(inscripcionEventoModel);
            let createdTestDocument: InscripcionEventoDto = new InscripcionEventoDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

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
}

export default InscripcionEventoRepo;

function reject(error: unknown): InscripcionEventoDto[] | PromiseLike<InscripcionEventoDto[]> {
    throw new Error("Function not implemented.");
}
