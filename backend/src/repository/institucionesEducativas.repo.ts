import mongoose from "mongoose";
import InstitucionesEducativasDto from "../dtos/institucionesEducativas.dto";
import { InstitucionesEducativas } from '../models/institucionesEducativas.model';


class InstitucionesEducativasRepo {


    async create(institucionesEducativasDto: InstitucionesEducativasDto): Promise<InstitucionesEducativasDto> {
        try {
            let institucionesEducativasModel = new InstitucionesEducativas({
                nombre: institucionesEducativasDto.getNombre(),
                paisIES: institucionesEducativasDto.getPaisIES(),
                regionDepartamento: institucionesEducativasDto.getRegionDepartamento(),
                nombreLiderIES: institucionesEducativasDto.getNombreLiderIES(),
                correoContacto: institucionesEducativasDto.getCorreoContacto(),
                telefonoContacto: institucionesEducativasDto.getTelefonoContacto(),
                urlOficial: institucionesEducativasDto.getUrlOficial()
            });
            let createdDocument = await InstitucionesEducativas.create(institucionesEducativasModel);
            let createdInstitucionesEducativasDocument: InstitucionesEducativasDto = new InstitucionesEducativasDto(createdDocument);
            return createdInstitucionesEducativasDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
/*
    async obtener(): Promise<InstitucionesEducativasDto[]> {
        try {
            let institucionesEducativasArray: InstitucionesEducativasDto[] = [];
            let docs = await InstitucionesEducativas.find();
            docs.forEach((institucionesEducativasDocument: any) => {
                institucionesEducativasArray.push(new InstitucionesEducativasDto(institucionesEducativasDocument));
            });
            return institucionesEducativasArray;
        } catch (error) {
            return reject (error);
        }
    }
*/

    async obtener(): Promise<InstitucionesEducativasDto[]>{
        try {
            let institucionesEducativasArray = await InstitucionesEducativas.aggregate([
                {
                  '$lookup': {
                    'from': 'paises', 
                    'localField': 'paisIES', 
                    'foreignField': '_id', 
                    'as': 'pais'
                  }
                }, {
                  '$unwind': {
                    'path': '$pais'
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'nombre': 1, 
                    'paisIES': 1, 
                    'regionDepartamento': 1, 
                    'nombreLiderIES': 1, 
                    'telefonoContacto': 1, 
                    'correoContacto': 1, 
                    'urlOficial': 1, 
                    'nombrePais': '$pais.descripcion'
                  }
                }
              ]);
            return institucionesEducativasArray;
        } catch (error) {
            return reject (error);
        }
    }

    
    async obtenerIESPorPais(idPais: string): Promise<InstitucionesEducativasDto[]>{
        try {
            let institucionesPais = await InstitucionesEducativas.aggregate([
                {
                  '$match': {
                    'paisIES': new mongoose.Types.ObjectId(idPais)
                  }
                }
              ]);
            return institucionesPais;
        } catch (error) {
            console.log(error);
            throw new Error('Error al encontrar IES por pais')
        }
    }

}

export default InstitucionesEducativasRepo;
function reject(error: unknown): InstitucionesEducativasDto[] | PromiseLike<InstitucionesEducativasDto[]> {
    throw new Error("Function not implemented.");
}

