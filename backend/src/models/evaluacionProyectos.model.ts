import { Schema, model, Document } from "mongoose";

interface IEvaluacionProyectos extends Document {
 evaluador: Schema.Types.ObjectId;
 emprendimiento: Schema.Types.ObjectId;
 evaluacion: [];
}

const evaluacionProyectosSchema = new Schema <IEvaluacionProyectos>({
    evaluador: {
        type: Schema.Types.ObjectId,
        ref: 'evaluadores',
        required: [true, "El identificador del evaluador es necesario"]
    },
    emprendimiento: {
        type: Schema.Types.ObjectId,
        ref: 'informacionEmprendimiento',
        required: [true, "El identificador del emprendimiento es necesario"]
    },
    evaluacion: [{
        etapa: {
            type: String
        },
        preguntas: [{
            pregunta: {
                type: String
            },
            descripcion: {
                type: String
            },
            puntaje:{
                type: Number
            }
        }]
    }]
});

export const EvaluacionProyectos = model <IEvaluacionProyectos>('EvaluacionProyectos', evaluacionProyectosSchema, 'evaluacionProyectos');
export { IEvaluacionProyectos };