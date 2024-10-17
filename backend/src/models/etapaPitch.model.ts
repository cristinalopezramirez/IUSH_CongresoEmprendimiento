import { Schema, model, Document } from "mongoose";

interface IEtapaPitch extends Document {
    emprendimiento: Schema.Types.ObjectId;
    emprendedor: Schema.Types.ObjectId;
    idSector: Schema.Types.ObjectId;
    idInstitucion: Schema.Types.ObjectId;
    idPais: Schema.Types.ObjectId;
    promedio: Number;
    estado: String;
    institucion: String;
    pais: String;
    integrantes: String;
    sector: String;
    correoElectronicoPersonal: String;
    correoElectronicoInstitucional: String;
    pasaAPitch: Boolean
}

const etapaPithcSchema = new Schema <IEtapaPitch>({
    emprendimiento: {
        type: Schema.Types.ObjectId,
        ref: 'informacionEmprendimiento',
        required: [true, "El identificador del emprendimiento es necesario"],
        unique: true
    },
    promedio: {
        type: Number
    },
    emprendedor: {
        type: Schema.Types.ObjectId,
        ref: "InformacionGeneral",
    },
    idSector: {
        type: Schema.Types.ObjectId,
        ref: "SectorEmprendimiento",
    },
    idInstitucion: {
        type: Schema.Types.ObjectId,
        ref: "InstitucionesEducativas",
    },
    idPais:{
        type: Schema.Types.ObjectId,
        ref: "Pais",
    },
    estado: {
        type: String,
    },
    institucion:{
        type: String,
    },
    pais: {
        type: String,
    },
    integrantes: {
        type: String,
    },
    sector: {
        type: String,
    },
    correoElectronicoPersonal: {
        type: String,
    },
    correoElectronicoInstitucional: {
        type: String,
    },
    pasaAPitch: {
        type: Boolean
    }
});

export const EtapaPitch = model<IEtapaPitch>('EtapaPitch', etapaPithcSchema, 'etapaPitch');
export { IEtapaPitch };






/*
[
    {
    "_id": {
      "$oid": "67100fe22d74d548dcb94d46"
    },
    "emprendimiento": {
      "$oid": "669821e77dd98655ecb51866"
    },
    "promedio": 3.8333333333333335,
    "idSector": {
      "$oid": "66957181c82228c4e3901646"
    },
    "idInstitucion": {
      "$oid": "66957e398d1d1da498ff9a47"
    },
    "idPais": {
      "$oid": "6695786ac82228c4e3901665"
    },
    "estado": "Crecimiento",
    "institucion": "UNIVERSIDAD D'ANDORRA",
    "pais": "ANDORRA",
    "emprendedor": {
      "$oid": "66957f648d1d1da498ff9a5b"
    },
    "integrantes": "persona1 nombres persona1 apellido",
    "sector": "Tecnología",
    "correoElectronicoPersonal": "persona1@asfa.com",
    "correoElectronicoInstitucional": "persona1@dfañl.com",
    "pasaAPitch": true
  }
]
*/