import exp from "constants";
import AsignarEvaluadorEmprendimientoDto from "../dtos/asignarEvaluadorEmprendimiento.dto";
import { AsignarEvaluadorEmprendimientos } from "../models/asignarEvaluadorEmprendimiento.model";
import mongoose from "mongoose";


class AsignarEvaluadorEmprendimientoRepo {

    async create ( asignarEvaluadorEmprendimientoDto: AsignarEvaluadorEmprendimientoDto): Promise<AsignarEvaluadorEmprendimientoDto> {
        try {
            let asignarEvaluadorEmprendimientoModel = new AsignarEvaluadorEmprendimientos({
                idEvaluador: asignarEvaluadorEmprendimientoDto.getIdEvaluador(),
                emprendimientos: asignarEvaluadorEmprendimientoDto.getEmprendimientos()
            });
            let createdDocument = await AsignarEvaluadorEmprendimientos.create(asignarEvaluadorEmprendimientoModel);
            let answer: AsignarEvaluadorEmprendimientoDto = new AsignarEvaluadorEmprendimientoDto(createdDocument);
            return answer;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtener (): Promise<AsignarEvaluadorEmprendimientoDto[]> {
        try {
            let evaluadoresEmprendimientoArray: AsignarEvaluadorEmprendimientoDto[] = [];
            let docs = await AsignarEvaluadorEmprendimientos.find();
            docs.forEach((evaluadoresEmprendimientoDocument: any) => {
                evaluadoresEmprendimientoArray.push(new AsignarEvaluadorEmprendimientoDto(evaluadoresEmprendimientoDocument));
            });
            return evaluadoresEmprendimientoArray;
        } catch (error) {
            return reject (error);
        }
    }

    async obtenerPorIdEvaluador (idEvaluador: string): Promise<AsignarEvaluadorEmprendimientoDto[]>{
        try {
            let informacion = await AsignarEvaluadorEmprendimientos.aggregate([
                {
                  '$match': {
                    'idEvaluador': new mongoose.Types.ObjectId(idEvaluador)
                  }
                }, {
                  '$unwind': {
                    'path': '$emprendimientos'
                  }
                }, {
                  '$lookup': {
                    'from': 'informacionEmprendimiento', 
                    'localField': 'emprendimientos', 
                    'foreignField': '_id', 
                    'as': 'informacionEmprendimiento'
                  }
                }, {
                  '$unwind': {
                    'path': '$informacionEmprendimiento'
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'idEvaluador': 1, 
                    'informacionEmprendimiento': 1
                  }
                }
              ]);
              return informacion;
        } catch (error) {
            return reject(error)
        }
    }

    

    
}

export default AsignarEvaluadorEmprendimientoRepo;

function reject(error: unknown): AsignarEvaluadorEmprendimientoDto[] | PromiseLike<AsignarEvaluadorEmprendimientoDto[]> {
    throw new Error("Function not implemented.");
}
