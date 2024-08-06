import { Schema, model, Document } from 'mongoose';

// Definición de la interfaz para el modelo
interface ITest extends Document {
    nombre: string;
    cantidad: number;
    activo: boolean;
}

// Definición del esquema
const testSchema = new Schema<ITest>({
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});

// Definición del modelo, especificando el nombre de la colección como 'test'
export const Test = model<ITest>('Test', testSchema, 'test');
export { ITest };
