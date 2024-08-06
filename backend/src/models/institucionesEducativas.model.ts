import { Schema, model, Document } from "mongoose";

interface IInstitucionesEducativas extends Document {
    nombre: string;
    paisIES: Schema.Types.ObjectId;
    regionDepartamento: string;
    nombreLiderIES: string;
    correoContacto: string;
    telefonoContacto: string;
    urlOficial: string;
}

const institucionesEducativasSchema = new Schema <IInstitucionesEducativas>({
    nombre: { 
        type: String, 
        required: true,
        trim: true,
        uppercase: true
    },
    paisIES: { 
        type: Schema.Types.ObjectId, 
        ref:"Pais",
        required: true,
    },
    regionDepartamento:{
        type: String,
        required: false,
        uppercase: true
    },
    nombreLiderIES:{
        type: String,
        required: false,
        uppercase: true
    },
    correoContacto:{
        type: String,
        required: false
    },
    telefonoContacto:{
        type: String,
        required: false
    },
    urlOficial:{
        type: String,
        required: false
    }
});


export const InstitucionesEducativas = model<IInstitucionesEducativas>('InstitucionesEducativas', institucionesEducativasSchema, 'institucionesEducativas');
export { IInstitucionesEducativas };
