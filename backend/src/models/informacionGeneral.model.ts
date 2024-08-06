import { Schema, model, Document } from "mongoose";

interface IInformacionGeneral extends Document{
    nombres: string;
    apellidos: string;
    pais: Schema.Types.ObjectId;
    ciudadResidencia: string;
    documentoIdentidad: string;
    correoElectronicoPersonal: string;
    correoElectronicoInstitucional: string;
    numeroTelefono: string;
    idIES: Schema.Types.ObjectId;
    programaAcademico: string;
}


const informacionGeneralSchema = new Schema <IInformacionGeneral>({
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
    pais:{
        type: Schema.Types.ObjectId,
        ref: "Pais",
        required: true,
        trim: true
    },
    ciudadResidencia:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    documentoIdentidad:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    correoElectronicoPersonal:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    correoElectronicoInstitucional:{
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
    idIES: {
        type: Schema.Types.ObjectId,
        ref: "InstitucionesEducativas",
        required: [true, "El nombre de la IES es necesario"]
    },
    programaAcademico:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
});

export const InformacionGeneral = model <IInformacionGeneral>('InformacionGeneral',informacionGeneralSchema, 'informacionGeneral');
export { IInformacionGeneral };