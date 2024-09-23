import mongoose from "mongoose";
import EvaluadorDto from "../dtos/evaluadores.dto";
import { Evaluador } from "../models/evaluadores.model";


class EvaluadorRepo { 

    async create ( evaluadorDto: EvaluadorDto): Promise<EvaluadorDto> {
        try {
            let evaluadorModel = new Evaluador({
                nombre: evaluadorDto.getNombre(),
                idIES: evaluadorDto.getIdIES(),
                telefono: evaluadorDto.getTelefono(),
                correo: evaluadorDto.getCorreo(),
                idPais: evaluadorDto.getIdPais(),
                documentoIdentidad: evaluadorDto.getDocumentoIdentidad()
            });
            let createdDocument = await Evaluador.create(evaluadorModel);
            let createdTestDocument: EvaluadorDto = new EvaluadorDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /*
    async obtener(): Promise<EvaluadorDto[]> {
        try {
            let evaluadorArray: EvaluadorDto[] = [];
            let docs = await Evaluador.find();
            docs.forEach((evaluadorDocument: any) => {
                evaluadorArray.push(new EvaluadorDto(evaluadorDocument));
            });
            return evaluadorArray;
        } catch (error) {
            return reject (error);
        }
    }
*/

    async obtener(): Promise<any> {
      try {
        let infoEvaluador = await Evaluador.aggregate([
          {
            '$lookup': {
              'from': 'paises', 
              'localField': 'idPais', 
              'foreignField': '_id', 
              'as': 'infoPais'
            }
          }, {
            '$lookup': {
              'from': 'institucionesEducativas', 
              'localField': 'idIES', 
              'foreignField': '_id', 
              'as': 'infoIES'
            }
          }, {
            '$unwind': {
              'path': '$infoIES'
            }
          }, {
            '$unwind': {
              'path': '$infoPais'
            }
          }, {
            '$project': {
              '_id': 1, 
              'nombre': 1, 
              'telefono': 1, 
              'correo': 1, 
              'idIES': 1, 
              'idPais': 1, 
              'documentoIdentidad': 1, 
              'nombrePais': '$infoPais.descripcion', 
              'nombreInstitucion': '$infoIES.nombre'
            }
          }
        ]);
        return infoEvaluador;
      } catch (error) {
        throw new Error("Error al obtener información del evaluador");
      }
    }

    async obtenerEvaluadoresPorPais(idPais: string): Promise<EvaluadorDto[]> {
        try {
            let evaluadores = await Evaluador.aggregate([
                {
                    '$match': {
                        'idPais': new mongoose.Types.ObjectId(idPais)
                    }
                }
            ]);
            return evaluadores;
        } catch (error) {
            return reject (error);
        }
    }

    async loginEvaluador(documentoIdentidad: string, correo: string): Promise<EvaluadorDto[]> {
      try {
        let evaluador = await Evaluador.aggregate([
          {
            '$match': {
              'correo': correo, 
              'documentoIdentidad': documentoIdentidad
            }
          }
        ]);
        return evaluador;
      } catch (error) {
        return reject(error)
      }
    }

    async listarProyectosNoAsociados(idEvaluador: string): Promise<EvaluadorDto[]> {
        try {
            let proyectos = await Evaluador.aggregate([
                {
                  '$match': {
                    '_id': new mongoose.Types.ObjectId(idEvaluador)
                  }
                }, {
                  '$lookup': {
                    'from': 'institucionesEducativas', 
                    'localField': 'idIES', 
                    'foreignField': '_id', 
                    'as': 'IES'
                  }
                }, {
                  '$unwind': '$IES'
                }, {
                  '$lookup': {
                    'from': 'informacionEmprendimiento', 
                    'let': {
                      'evaluatorIES': '$idIES'
                    }, 
                    'pipeline': [
                      {
                        '$match': {
                          '$expr': {
                            '$ne': [
                              '$idIES', '$$evaluatorIES'
                            ]
                          }
                        }
                      }
                    ], 
                    'as': 'proyectosNoAsociados'
                  }
                }, {
                  '$project': {
                    'proyectosNoAsociados': 1, 
                    '_id': 0
                  }
                }
              ]);
              return proyectos;
        } catch (error) {
            return reject (error);
        }
    }


}


export default EvaluadorRepo;

function reject(error: unknown): EvaluadorDto[] | PromiseLike<EvaluadorDto[]> {
    throw new Error("Function not implemented.");
}

