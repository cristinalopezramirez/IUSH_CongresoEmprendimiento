import { Schema, model, Document } from "mongoose";

interface IAdministrador  extends Document {
    nombre: string;
    telefono: string;
    correo: string;
    documentoIdentidad: string;
}

const administradorSchema = new Schema<IAdministrador>({
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
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
    }
});

export const Administrador = model<IAdministrador>('Administrador', administradorSchema, 'administradores');
export { IAdministrador };