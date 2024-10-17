import EvaluacionProyectosDto from "../dtos/evaluacionProyectos.dto";
import { EvaluacionProyectos } from "../models/evaluacionProyectos.model";



class EvaluacionProyectosRepo {

    async create( evaluacionProyectosDto: EvaluacionProyectosDto): Promise <EvaluacionProyectosDto> {
        try {
            let evaluacionProyectosModel = new EvaluacionProyectos({
                evaluador: evaluacionProyectosDto.getEvaluador(),
                emprendimiento: evaluacionProyectosDto.getEmprendimiento(),
                evaluacion: evaluacionProyectosDto.getEvaluacion(),
                promedio: evaluacionProyectosDto.getPromedio()
            });
            let createdDocument = await EvaluacionProyectos.create(evaluacionProyectosModel);
            let createdTestDocument: EvaluacionProyectosDto = new EvaluacionProyectosDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtener(): Promise<EvaluacionProyectosDto[]> {
        try {
            let evaluacionesArray: EvaluacionProyectosDto[] = [];
            let docs = await EvaluacionProyectos.find();
            docs.forEach((evaluacionesDocument: any) => {
                evaluacionesArray.push(new EvaluacionProyectosDto(evaluacionesDocument));
            });
            return evaluacionesArray;
        } catch (error) {
            return reject (error);
        }
    }

    async listarProyectosEvaludados(): Promise<any>{
        try {
            let proyectosEvaluados = await EvaluacionProyectos.aggregate([
              {
                '$lookup': {
                  'from': 'informacionEmprendimiento', 
                  'localField': 'emprendimiento', 
                  'foreignField': '_id', 
                  'as': 'informacionEmprendimiento'
                }
              }, {
                '$unwind': {
                  'path': '$informacionEmprendimiento'
                }
              }, {
                '$lookup': {
                  'from': 'informacionGeneral', 
                  'localField': 'informacionEmprendimiento.idEmprendedor', 
                  'foreignField': '_id', 
                  'as': 'informacionGeneral'
                }
              }, {
                '$unwind': {
                  'path': '$informacionGeneral'
                }
              }, {
                '$lookup': {
                  'from': 'institucionesEducativas', 
                  'localField': 'informacionEmprendimiento.idIES', 
                  'foreignField': '_id', 
                  'as': 'ies'
                }
              }, {
                '$unwind': {
                  'path': '$ies'
                }
              }, {
                '$sort': {
                  'promedio': -1
                }
              }, {
                '$lookup': {
                  'from': 'sectoresEmprendimiento', 
                  'localField': 'informacionEmprendimiento.idSector', 
                  'foreignField': '_id', 
                  'as': 'sector'
                }
              }, {
                '$unwind': {
                  'path': '$sector'
                }
              }, {
                '$lookup': {
                  'from': 'paises', 
                  'localField': 'informacionGeneral.pais', 
                  'foreignField': '_id', 
                  'as': 'pais'
                }
              }, {
                '$unwind': {
                  'path': '$pais'
                }
              }, {
                '$project': {
                  'idSector': '$sector._id', 
                  'idInstitucion': '$ies._id', 
                  'idPais': '$pais._id', 
                  'estado': '$informacionEmprendimiento.estado', 
                  'institucion': '$ies.nombre', 
                  'pais': '$pais.descripcion', 
                  'promedio': 1, 
                  'emprendedor': '$informacionGeneral._id', 
                  'emprendimiento': 1, 
                  'integrantes': {
                    '$concat': [
                      '$informacionGeneral.nombres', ' ', '$informacionGeneral.apellidos'
                    ]
                  }, 
                  'sector': '$sector.sector', 
                  'correoElectronicoPersonal': '$informacionGeneral.correoElectronicoPersonal', 
                  'correoElectronicoInstitucional': '$informacionGeneral.correoElectronicoInstitucional'
                }
              }
            ]);
              return proyectosEvaluados;
        } catch (error) {
            throw new Error("Error al obtener proyectos evaluados");
        }
      }

      
}

export default EvaluacionProyectosRepo;

function reject(error: unknown): EvaluacionProyectosDto[] | PromiseLike<EvaluacionProyectosDto[]> {
    throw new Error("Function not implemented.");
}
