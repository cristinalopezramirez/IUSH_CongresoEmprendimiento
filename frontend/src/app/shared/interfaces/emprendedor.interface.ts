import { BaseRespuesta } from "./base-respuesta.interface";

export interface Emprendedor {
    _id?: string;
    nombres: string;
    apellidos: string;
    pais: string;
    ciudadResidencia: string;
    documentoIdentidad: string;
    correoElectronicoPersonal: string;
    correoElectronicoInstitucional: string;
    numeroTelefono: string;
    idIES: string;
    programaAcademico: string;
}

export interface EmprendedorCreadoRespuesta extends BaseRespuesta<Emprendedor> { }
