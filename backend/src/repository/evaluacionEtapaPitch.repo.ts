import EvaluacionEtapaPitchDto from "../dtos/evaluacionEtapaPitch.dto";
import { EvaluacionEtapaPitch } from "../models/evaluacionEtapaPitch.model";



class EvaluacionEtapaPitchRepo {

    async create ( evaluacionEtapaPitchDto: EvaluacionEtapaPitchDto ): Promise <EvaluacionEtapaPitchDto> {
        try {
            let evaluacionEtapaPitchModel = new EvaluacionEtapaPitch({
                evaluador: evaluacionEtapaPitchDto.getEvaluador(),
                emprendimiento: evaluacionEtapaPitchDto.getEmprendimiento(),
                evaluacionPitch: evaluacionEtapaPitchDto.getEvaluacionPitch(),
                promedio: evaluacionEtapaPitchDto.getPromedio(),
                numeroEmprendimiento: evaluacionEtapaPitchDto.getNumeroEmprendimiento()
            });
            let createdDocument = await EvaluacionEtapaPitch.create(evaluacionEtapaPitchModel);
            let createdTestDocument: EvaluacionEtapaPitchDto = new EvaluacionEtapaPitchDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtener(): Promise<EvaluacionEtapaPitchDto[]> {
        try {
            let evaluacionesArray: EvaluacionEtapaPitchDto[] = [];
            let docs = await EvaluacionEtapaPitch.find();
            docs.forEach((evaluacionesDocument: any) => {
                evaluacionesArray.push(new EvaluacionEtapaPitchDto(evaluacionesDocument));
            });
            return evaluacionesArray;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async resultadosPitch(): Promise<EvaluacionEtapaPitchDto[]>{
        try {
            let resultadosPitch = await EvaluacionEtapaPitch.aggregate([
                {
                  '$group': {
                    '_id': '$emprendimiento', 
                    'promedio': {
                      '$avg': '$promedio'
                    }, 
                    'emprendimiento': {
                      '$first': '$emprendimiento'
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'etapaPitch', 
                    'localField': 'emprendimiento', 
                    'foreignField': 'emprendimiento', 
                    'as': 'infoEmprendimiento'
                  }
                }, {
                  '$unwind': {
                    'path': '$infoEmprendimiento'
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'promedio': 1, 
                    'emprendimiento': '$infoEmprendimiento.emprendimiento', 
                    'sector': '$infoEmprendimiento.sector', 
                    'estado': '$infoEmprendimiento.estado', 
                    'institucion': '$infoEmprendimiento.institucion', 
                    'pais': '$infoEmprendimiento.pais', 
                    'nombreCompleto': '$infoEmprendimiento.integrantes', 
                    'correoElectronicoPersonal': '$infoEmprendimiento.correoElectronicoPersonal', 
                    'correoElectronicoInstitucional': '$infoEmprendimiento.correoElectronicoInstitucional'
                  }
                }, {
                  '$sort': {
                    'promedio': -1
                  }
                }
              ]);
              return resultadosPitch;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

export default EvaluacionEtapaPitchRepo;