import mongoose from "mongoose";
import PreguntasDto from "../dtos/preguntas.dto";
import { Pregunta } from "../models/preguntas.model";

class PreguntasRepo {

    async create( preguntasDto: PreguntasDto): Promise<PreguntasDto> {
        try {
            let preguntaModel = new Pregunta({
                year: preguntasDto.getYear(),
                numero: preguntasDto.getNumero(),
                pregunta: preguntasDto.getPregunta()
            });
            let createdDocument = await Pregunta.create(preguntaModel);
            let createdPregunta: PreguntasDto = new PreguntasDto(createdDocument);
            return createdPregunta;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtener(): Promise<PreguntasDto[]> {
        try {
            let preguntasArray: PreguntasDto[] = [];
            let docs = await Pregunta.find();
            docs.forEach((preguntasDocument: any) => {
                preguntasArray.push(new PreguntasDto(preguntasDocument));
            });
            return preguntasArray;
        } catch (error) {
            return reject (error);
        }
    }

    async obtenerPorYear(year: number): Promise<PreguntasDto[]> {
        try {
            let preguntasPorYear = await Pregunta.aggregate([
                {
                  '$sort': {
                    'numero': 1
                  }
                }, {
                  '$match': {
                    'year': year
                  }
                }
              ])
            return preguntasPorYear;
        } catch (error) {
            console.log(error);
            throw new Error('Error al encontrar preguntas por año')
        }
    }


}

export default PreguntasRepo;

function reject(error: unknown): PreguntasDto[] | PromiseLike<PreguntasDto[]> {
    throw new Error("Function not implemented.");
}
