import EtapaPitchDto from "../dtos/etapaPitch.dto";
import { EtapaPitch } from "../models/etapaPitch.model";

class EtapaPitchRepo {

    async create ( etapaPitchDto: EtapaPitchDto): Promise <EtapaPitchDto> {
        try {
            let etapaPitchModel = new EtapaPitch({
                emprendimiento : etapaPitchDto.getEmprendimiento(),
                emprendedor : etapaPitchDto.getEmprendedor(),
                idSector : etapaPitchDto.getIdSector(),
                idInstitucion : etapaPitchDto.getIdInstitucion(),
                idPais : etapaPitchDto.getIdPais(),
                promedio : etapaPitchDto.getPromedio(),
                estado : etapaPitchDto.getEstado(),
                institucion : etapaPitchDto.getInstitucion(),
                pais : etapaPitchDto.getPais(),
                integrantes : etapaPitchDto.getIntegrantes(),
                sector : etapaPitchDto.getSector(),
                correoElectronicoPersonal : etapaPitchDto.getCorreoElectronicoCorreoElectronicoPersonal(),
                correoElectronicoInstitucional : etapaPitchDto.getCorreoElectronicoInstitucional(),
                pasaAPitch : etapaPitchDto.getPasaAPitch()
            });
            let createdDocument = await EtapaPitch.create(etapaPitchModel);
            let createdTestDocument: EtapaPitchDto = new EtapaPitchDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.error('Error al almacenar proyecto en etapa pitch: ', error);
            throw new Error("Error al almacenar proyecto en etapa pitch");
        }
    }

    async obtener(): Promise<EtapaPitchDto[]> {
        try {
            let proyectosPitchArray: EtapaPitchDto[] = [];
            let docs = await EtapaPitch.find();
            docs.forEach((proyectosDocument: any) => {

                proyectosPitchArray.push(new EtapaPitchDto(proyectosDocument));
            });
            return proyectosPitchArray;
        } catch (error) {
            throw new Error("Error al obtener proyectos");
        }
    }
}

export default EtapaPitchRepo;
