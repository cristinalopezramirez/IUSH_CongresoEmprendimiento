import mongoose from "mongoose";
import AdministradorDto from "../dtos/administrador.dto";
import { Administrador } from "../models/administrador.model";


class AdministradorRepo {

    async create ( administradorDto: AdministradorDto): Promise<AdministradorDto> {
        try {
            let administradorModel = new Administrador({
                nombre: administradorDto.getNombre(),
                telefono: administradorDto.getTelefono(),
                correo: administradorDto.getCorreo(),
                documentoIdentidad: administradorDto.getDocumentoIdentidad()
            });
            let createdDocument = await Administrador.create(administradorModel);
            let createdTestDocument: AdministradorDto = new AdministradorDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtener(): Promise<AdministradorDto[]> {
        try {
            let administradorArray: AdministradorDto[] = [];
            let docs = await Administrador.find();
            docs.forEach((administradorDocument: any) => {
                administradorArray.push(new AdministradorDto(administradorDocument));
            });
            return administradorArray;
        } catch (error) {
            return reject (error);
        }
    }

    async loginAdministrador(documentoIdentidad: string, correo: string): Promise<AdministradorDto[]> {
        try {
          let administrador = await Administrador.aggregate([
            {
              '$match': {
                'correo': correo, 
                'documentoIdentidad': documentoIdentidad
              }
            }
          ]);
          return administrador;
        } catch (error) {
          return reject(error)
        }
      }    


}

export default AdministradorRepo;

function reject(error: unknown): AdministradorDto[] | PromiseLike<AdministradorDto[]> {
    throw new Error("Function not implemented.");
}
