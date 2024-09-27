import InformacionEmprendimientoDto from "../dtos/informacionEmprendimiento.dto";
import { InformacionEmprendimiento } from "../models/informacionEmprendimiento.model";
import mongoose from "mongoose";

class InformacionEmprendimientoRepo {

    async create(informacionEmprendimientoDto: InformacionEmprendimientoDto): Promise<InformacionEmprendimientoDto> {
        const currentDate = new Date();
        try {
            let contador = await this.getCollectionSize();
            let numberOfDocuments = contador.length > 0 ? Number(contador[0].count) : 0;
            let informacionEmprendimientoModel = new InformacionEmprendimiento({
                idSector: informacionEmprendimientoDto.getIdSector(),
                idIES: informacionEmprendimientoDto.getIdIES(),
                idEmprendedor: informacionEmprendimientoDto.getIdEmprendedor(),
                fecha: informacionEmprendimientoDto.getFecha(),
                fechaInscripcion: currentDate.getFullYear(),
                respuestas: informacionEmprendimientoDto.getRespuestas(),
                numeroEmprendimiento: ++numberOfDocuments,
                estado: informacionEmprendimientoDto.getEstado(),
                descripcionIdea: informacionEmprendimientoDto.getDescripcionIdea(),
                propuestaSolucion: informacionEmprendimientoDto.getPropuestaSolucion(),
                asignado: informacionEmprendimientoDto.getAsignado()
            });
            let createdDocument = await InformacionEmprendimiento.create(informacionEmprendimientoModel);
            return new InformacionEmprendimientoDto(createdDocument);
        } catch (error) {
            throw new Error("Error al crear el documento en InformacionEmprendimiento");
        }    
    }
    
/*
    async obtener(): Promise<InformacionEmprendimientoDto[]> {
        try {
            let emprendimientosArray: InformacionEmprendimientoDto[] = [];
            let docs = await InformacionEmprendimiento.find();
            docs.forEach((emprendimientosDocument: any) => {
                emprendimientosArray.push(new InformacionEmprendimientoDto(emprendimientosDocument));
            });
            return emprendimientosArray;
        } catch (error) {
            return reject (error);
        }
    }
*/

    async obtener(): Promise<any>{
        try {
            let emprendimientos = await InformacionEmprendimiento.aggregate([
                {
                  $lookup: {
                    'from': 'sectoresEmprendimiento', 
                    'localField': 'idSector', 
                    'foreignField': '_id', 
                    'as': 'sector'
                  }
                }, {
                  $lookup: {
                    'from': 'informacionGeneral', 
                    'localField': 'idEmprendedor', 
                    'foreignField': '_id', 
                    'as': 'infoEmprendedor'
                  }
                }, {
                  $lookup: {
                    'from': 'institucionesEducativas', 
                    'localField': 'idIES', 
                    'foreignField': '_id', 
                    'as': 'IES'
                  }
                }, {
                  $unwind: '$sector'
                }, {
                  $unwind: '$IES'
                }, {
                  $unwind: '$infoEmprendedor'
                }, {
                  $lookup: {
                    'from': 'paises', 
                    'localField': 'IES.paisIES', 
                    'foreignField': '_id', 
                    'as': 'pais'
                  }
                }, {
                  $unwind: '$pais'
                }, {
                  $project: {
                    'fecha': 1, 
                    '_id': 1, 
                    'estado': 1, 
                    'sector': 1, 
                    'IES': 1, 
                    'infoEmprendedor': 1, 
                    'pais': 1,
                    'descripcionIdea':1,
                    'propuestaSolucion': 1
                  }
                }
              ]);
              return emprendimientos;
        } catch (error) {
            throw new Error("Error al obtener información de los emprendimientos registrados")
        }
    }

    async obtenerPorIdEmprendedor(idEmprendedor: string): Promise<InformacionEmprendimientoDto[]> {
        try {
            let emprendimientos = await InformacionEmprendimiento.aggregate([
                {
                  '$match': {
                    'idEmprendedor': new mongoose.Types.ObjectId(idEmprendedor)
                  }
                }
              ]);
              return emprendimientos;
        } catch (error) {
            console.log(error);
            throw new Error('Error al encontrar emprendimientos por idEmprendedor')
        }
    }

    async obtenerPorIdSector(idSector: string): Promise<InformacionEmprendimientoDto[]> {
        try {
            let emprendimientos = await InformacionEmprendimiento.aggregate([
                {
                  '$match': {
                    'idSector': new mongoose.Types.ObjectId(idSector)
                  }
                }
              ]);
              return emprendimientos;
        } catch (error) {
            console.log(error);
            throw new Error('Error al encontrar emprendimientos por idSector')
        }
    }

    // Servicios útiles para la gereración de informes

    async getCollectionSize(): Promise<any>{
      try {
          let numberOfDocuments = await InformacionEmprendimiento.aggregate([
              {
                $count:"count"
              }
          ]);
          return numberOfDocuments;
      } catch (error) {
          console.log(error);
          throw new Error("Error al obtener número de emprendimientos registrados")
      }
    }

    async emprendimientosPorSector(sector: string): Promise<InformacionEmprendimientoDto[]> {
      try {
        let numeroEmprendimientos = await InformacionEmprendimiento.aggregate([
          {
            $lookup: {
              'from': 'sectoresEmprendimiento', 
              'localField': 'idSector', 
              'foreignField': '_id', 
              'as': 'sector'
            }
          }, {
            $unwind: '$sector'
          }, {
            $match: {
              'idSector': new mongoose.Types.ObjectId(sector)
            }
          }, {
            $count: 'count'
          }
        ]);
        return numeroEmprendimientos;
      } catch (error) {
        throw new Error("Error al obtener número de emprendimientos registrados por sector")
      }
    } 
    
    async emprendimientosPorEstado(estado: string): Promise<InformacionEmprendimientoDto[]> {
      try {
        let numeroEmprendimientos = await InformacionEmprendimiento.aggregate([
          {
            '$match': {
              'estado': estado
            }
          }, {
            '$count': 'count'
          }
        ]);
        return numeroEmprendimientos;
      } catch (error) {
        throw new Error("Error al obtener número de emprendimientos por estado registrados")
      }
    }

    async emprendimientosPorPais (pais: string): Promise<InformacionEmprendimientoDto[]> {
      try {
        let numberOfDocuments = await InformacionEmprendimiento.aggregate([
          {
            '$lookup': {
              'from': 'institucionesEducativas', 
              'localField': 'idIES', 
              'foreignField': '_id', 
              'as': 'IES'
            }
          }, {
            '$lookup': {
              'from': 'paises', 
              'localField': 'IES.paisIES', 
              'foreignField': '_id', 
              'as': 'pais'
            }
          }, {
            '$unwind': {
              'path': '$pais'
            }
          }, {
            '$match': {
              'pais._id': new mongoose.Types.ObjectId(pais)
            }
          }, {
            '$count': 'count'
          }
        ]);
        return numberOfDocuments;
      } catch (error) {
        throw new Error("Error al obtener número de emprendimientos registrados por pais")
      }
    }

    async emprendimientosPorIES (ies: string): Promise<InformacionEmprendimientoDto[]> {
      try {
        let numberOfDocuments = await InformacionEmprendimiento.aggregate([
          {
            '$match': {
              'idIES': new mongoose.Types.ObjectId(ies)
            }
          }, {
            '$count': 'count'
          }
        ]);
        return numberOfDocuments;
      } catch (error) {
        throw new Error("Error al obtener número de emprendimientos registrados por IES")
      }
    }

    async actualizarPorId(idInfoEmprendimiento: string, infoEmprendimiento: any): Promise<Boolean>{
      try {
        let infoEmprendimientoActualizada = await InformacionEmprendimiento.findByIdAndUpdate(idInfoEmprendimiento, {... infoEmprendimiento});
        return true;
      } catch (error) {
        throw error;
      }
    }

    





  }

export default InformacionEmprendimientoRepo;

function reject(error: unknown): InformacionEmprendimientoDto[] | PromiseLike<InformacionEmprendimientoDto[]> {
    throw new Error("Function not implemented.");
}

