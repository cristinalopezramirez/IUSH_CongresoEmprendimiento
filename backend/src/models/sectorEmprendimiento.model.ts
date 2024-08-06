import { Schema, model, Document } from 'mongoose';

// Definición de la interfaz para el modelo
interface ISectorEmprendimiento extends Document {
    sector: string;
    descripcion: string;
}

// Definición del esquema
const sectorEmprendimientoSchema = new Schema<ISectorEmprendimiento>({
    sector: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    }
});

// Definición del modelo, especificando el nombre de la colección como 'sectoresEmprendimiento'
export const SectorEmprendimiento = model<ISectorEmprendimiento>('SectorEmprendimiento', sectorEmprendimientoSchema, 'sectoresEmprendimiento');
export { ISectorEmprendimiento };
