import { Schema, model, Document} from 'mongoose';

interface IAsignarEvaluadorEmprendimientos extends Document {
    idEvaluador: Schema.Types.ObjectId;
    emprendimientos: [Schema.Types.ObjectId];    
}

const asignarEvaluadorEmprendimientosSchema = new Schema <IAsignarEvaluadorEmprendimientos>({
    idEvaluador: {
        type: Schema.Types.ObjectId,
        ref: "Evaluador",
        required: [true, "Se requiere seleccionar un evaluador"]
    },
    emprendimientos: [{
        type: Schema.Types.ObjectId,
        ref: "InformacionEmprendimiento",
        required: [true, "Se requiere al menos un emprendimiento"]
    }]
});

export const AsignarEvaluadorEmprendimientos = model<IAsignarEvaluadorEmprendimientos>('AsignarEvaluadorEmprendimientos',asignarEvaluadorEmprendimientosSchema,'asignarEvaluadorEmprendimientos');
export { IAsignarEvaluadorEmprendimientos };