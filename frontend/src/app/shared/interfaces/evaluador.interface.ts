import { BaseRespuesta } from "./base-respuesta.interface";

export interface Evaluador {
    _id?: string;
    nombre: string;
    idIES: string;
    telefono: string;
    correo: string;
    idPais: string;
    documentoIdentidad: string;
    nombrePais?: string;
    nombreInstitucion?: string;
}

export interface EvaluadorCreadoRespuesta extends BaseRespuesta<Evaluador> { };
export interface EvaluadorRespuesta extends BaseRespuesta<Evaluador[]> { };