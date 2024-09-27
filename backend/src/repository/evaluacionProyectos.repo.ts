import EvaluacionProyectosDto from "../dtos/evaluacionProyectos.dto";
import { EvaluacionProyectos } from "../models/evaluacionProyectos.model";



class EvaluacionProyectosRepo {

    async create( evaluacionProyectosDto: EvaluacionProyectosDto): Promise <EvaluacionProyectosDto> {
        try {
            let evaluacionProyectosModel = new EvaluacionProyectos({
                evaluador: evaluacionProyectosDto.getEvaluador(),
                emprendimiento: evaluacionProyectosDto.getEmprendimiento(),
                evaluacion: evaluacionProyectosDto.getEvaluacion()
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
}

export default EvaluacionProyectosRepo;

function reject(error: unknown): EvaluacionProyectosDto[] | PromiseLike<EvaluacionProyectosDto[]> {
    throw new Error("Function not implemented.");
}
