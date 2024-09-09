import { Schema, model, Document } from 'mongoose';



interface IInformacionEmprendimiento extends Document {
 idSector: Schema.Types.ObjectId;
 idIES: Schema.Types.ObjectId;
 idEmprendedor: Schema.Types.ObjectId;
 fecha: string;
 fechaInscripcion: number;
 respuestas: [];
 estado: string;
 numeroEmprendimiento: number;
 descripcionIdea: string;
 propuestaSolucion: string;
}

const informacionEmprendimientoSchema = new Schema <IInformacionEmprendimiento>({
    idSector: {
        type: Schema.Types.ObjectId,
        ref: "SectorEmprendimiento",
        required: [true, "El sector de emprendimiento es necesario"]
    },
    idIES: {
        type: Schema.Types.ObjectId,
        ref: "InformacionGeneral",
        required: [true, "El id de la IES es necesario"]
    },
    idEmprendedor: {
        type: Schema.Types.ObjectId,
        ref: "InformacionGeneral",
        isRequired: [true, "El id del emprendedor es necesario"],
        unique: true
    },
    fecha: {
        type: String,
        required: [true, "La fecha de inicio es necesara"]
    },
    fechaInscripcion: {
        type: Number
    },
    respuestas:[{
        numeroPregunta:{
            type: Number,
        },
        respuestaPregunta: {
            type: Boolean,
        },
        etapa: {
            type: String,
        }
    }],
    estado: {
        type: String
    },
    numeroEmprendimiento: {
        type: Number
    },
    descripcionIdea: {
        type: String
    },
    propuestaSolucion: {
        type: String
    }
});

export const InformacionEmprendimiento = model<IInformacionEmprendimiento>('InformacionEmprendimiento', informacionEmprendimientoSchema, 'informacionEmprendimiento');
export { IInformacionEmprendimiento };