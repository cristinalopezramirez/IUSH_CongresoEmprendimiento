import exp from "constants";
import { Schema, model, Document } from "mongoose";

interface IInscripcionEvento extends Document {
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    pais: Schema.Types.ObjectId;
    ciudad: string;
    tipoAsistente: string;
    interesesEvento:[];
    comoTeEnterasteEvento:[];
    aceptaEnvioComunicacion: boolean;
    aceptaTerminosYCondicionesTratamientoDatos: boolean;
}

const inscripcionEventoSchema = new Schema<IInscripcionEvento>({
    nombres: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    correo: {
        type: String,
        required: [true, "El correo de contacto es necesario"],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, "El teléfono de contacto es necesario"]
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: "Pais",
        required: [true, "El pais es necesario"]
    },
    ciudad: {
        type: String,
        required: [true, "La ciudad es necesaria"],
        trim: true,
        uppercase: true
    },
    tipoAsistente: {
        type: String,
        required: [true, "El tipo de asistencia es necesaria"],
        trim: true,
        uppercase: true
    },
    interesesEvento: [{
        pregunta: {
            type: String,
        },
        respuesta: {
            type: String
        }
    }],
    comoTeEnterasteEvento: [{
        pregunta: {
            type: String,
        },
        respuesta: {
            type: String
        }
    }],
    aceptaEnvioComunicacion: {
        type: Boolean,
        required: [true, "Indicar si acepta comunicaciones es necesario"]
    },
    aceptaTerminosYCondicionesTratamientoDatos: {
        type: Boolean,
        required: [true, "Indicar si acepta los términos es necesario"]
    },
});

export const InscripcionEvento = model<IInscripcionEvento>('InscripcionEvento', inscripcionEventoSchema, 'inscripcionEvento');
export { IInscripcionEvento };