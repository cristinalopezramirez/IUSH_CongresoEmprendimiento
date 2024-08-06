import { Schema, model, Document } from "mongoose";

interface IPreguntas extends Document {
    year: number;
    numero: number;
    pregunta: string;
}

const preguntaSchema = new Schema<IPreguntas>({
    year: {
        type: Number,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    pregunta: {
        type: String,
        required: true,
        trim: true
    }
});

export const Pregunta = model <IPreguntas>('Pregunta', preguntaSchema, 'preguntas');
export { IPreguntas };