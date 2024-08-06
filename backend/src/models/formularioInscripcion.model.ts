import { Schema, model, Document } from "mongoose";

interface IFormularioInscripcion extends Document {
    nombres: string;
    apellidos: string;
    correoElectronico: string
    numeroTelefono: string;
    pais: Schema.Types.ObjectId;
    ciudad: string;
    tipoAsistente: string;
    intereses: [];
    conocimientoEvento: string;
    envioComunicacion: boolean;
    aceptarTerminos: boolean;
}

const formularioInscripcionSchema = new Schema <IFormularioInscripcion>({
    nombres:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    apellidos:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    correoElectronico:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    numeroTelefono:{
        type: String,
        required: true,
        trim: true
    },
    pais:{
        type: Schema.Types.ObjectId,
        ref: "Pais",
        required: true,
        trim: true
    },
    ciudad:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    intereses: [{
        expectativa: {
            type: String,
        },
        valor: {
            type: String
        }
    }],
    conocimientoEvento: {
        type: String
    },
    envioComunicacion: {
        type: Boolean
    },
    aceptarTerminos: {
        type: Boolean
    }
})