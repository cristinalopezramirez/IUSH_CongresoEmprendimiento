import { Schema, model, Document } from "mongoose";

interface IEvaluador extends Document {
    nombre: string;
    idIES: Schema.Types.ObjectId;
    telefono: string;
    correo: string;
    idPais: Schema.Types.ObjectId;
    documentoIdentidad: string;
}

const evaluadorSchema = new Schema<IEvaluador>({
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    idIES: {
        type: Schema.Types.ObjectId,
        ref: "InstitucionesEducativas",
        required: [true, "El nombre de la IES es necesario"]
    },
    telefono: {
        type: String,
        required: [true, "El teléfono de contacto es necesario"]
    },
    correo: {
        type: String,
        required: [true, "El correo de contacto es necesario"],
        unique: true
    },
    documentoIdentidad:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    idPais: {
        type: Schema.Types.ObjectId,
        ref: "Pais",
        required: [true, "El pais es necesario"]
    }
});

export const Evaluador = model<IEvaluador>('Evaluador', evaluadorSchema, 'evaluadores');
export { IEvaluador };