import InformacionGeneralDto from "../dtos/informacionGeneral.dto";
import { InformacionGeneral } from "../models/informacionGeneral.model";

class InformacionGeneralRepo {

    async create(informacionGeneralDto: InformacionGeneralDto): Promise <InformacionGeneralDto> {
        try {
            let informacionGeneralModel = new InformacionGeneral({
                nombres:  informacionGeneralDto.getNombres(),
                apellidos:  informacionGeneralDto.getApellidos(),
                pais:  informacionGeneralDto.getPais(),
                ciudadResidencia:  informacionGeneralDto.getCiudadResidencia(),
                //tipoDocumento:  informacionGeneralDto.getTipoDocumento(),
                documentoIdentidad:  informacionGeneralDto.getDocumentoIdentidad(),
                correoElectronicoPersonal:  informacionGeneralDto.getCorreoElectronicoPersonal(),
                correoElectronicoInstitucional:  informacionGeneralDto.getCorreoElectronicoInstitucional(),
                numeroTelefono:  informacionGeneralDto.getNumeroTelefono(),
                idIES:  informacionGeneralDto.getIdIES(),
                programaAcademico: informacionGeneralDto.getProgramaAcademico()
            });
            let createdDocument = await InformacionGeneral.create(informacionGeneralModel);
            let createdTestDocument: InformacionGeneralDto = new InformacionGeneralDto(createdDocument);
            //console.log(createdDocument._id)
            return createdTestDocument;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtenerInformacionGeneral(): Promise<InformacionGeneralDto[]> {
        try {
            let informacionGeneralArray: InformacionGeneralDto[] = [];
            let docs = await InformacionGeneral.find();
            docs.forEach((informacionGeneralDocument: any) => {
                informacionGeneralArray.push(new InformacionGeneralDto(informacionGeneralDocument));
            });
            return informacionGeneralArray;
        } catch (error) {
            return reject (error);
        }
    }


    async obtenerPorDocumento(documentoIdentidad: string): Promise<InformacionGeneralDto[]> {
        try {
            let infoPorDocumento = await InformacionGeneral.aggregate([
                {
                    '$match': {
                      'documentoIdentidad': documentoIdentidad
                    }
                  }
            ]);
            return infoPorDocumento;
        } catch (error) {
            return reject(error);
        }
    }

}

export default InformacionGeneralRepo;
function reject(error: unknown): InformacionGeneralDto[] | PromiseLike<InformacionGeneralDto[]> {
    throw new Error("Function not implemented.");
}