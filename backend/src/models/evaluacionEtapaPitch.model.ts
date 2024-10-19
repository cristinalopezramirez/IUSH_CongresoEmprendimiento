import { Schema, model, Document } from "mongoose";

interface IEvaluacionEtapaPitch extends Document {
    evaluador: Schema.Types.ObjectId;
    emprendimiento: Schema.Types.ObjectId;
    evaluacionPitch: [];
    promedio: Number;
    numeroEmprendimiento: Number
}

const evaluacionEtapaPitchSchema = new Schema <IEvaluacionEtapaPitch>({
    evaluador: {
        type: Schema.Types.ObjectId,
        ref: 'evaluadores',
        required: [true, "El identificador del evaluador es necesario"]
    },
    numeroEmprendimiento: {
        type: Number
    },
    emprendimiento: {
        type: Schema.Types.ObjectId,
        ref: 'informacionEmprendimiento',
        required: [true, "El identificador del emprendimiento es necesario"],
    },
    evaluacionPitch:[{
        pregunta: {
            type: String
        },
        puntaje:{
            type: Number
        }
    }],
    promedio: {
        type: Number
    }
});

export const EvaluacionEtapaPitch = model < IEvaluacionEtapaPitch>('EvaluacionEtapaPitch', evaluacionEtapaPitchSchema, 'evaluacionEtapaPitch');
export { IEvaluacionEtapaPitch };


