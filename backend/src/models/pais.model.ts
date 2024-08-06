import { Schema, model, Document } from "mongoose";

interface IPais extends Document {
    nombre: string,
    descripcion: string
}

const paisSchema = new Schema<IPais> ({
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
});

export const Pais = model<IPais> ( 'Pais', paisSchema, 'paises');
export { IPais };