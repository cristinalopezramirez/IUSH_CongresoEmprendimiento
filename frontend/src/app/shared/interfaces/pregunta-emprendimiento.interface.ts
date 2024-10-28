import { BaseRespuesta } from "./base-respuesta.interface";

export interface PreguntaEmprendimiento {
    _id: string;
    year: number;
    numero: number;
    pregunta: string;
}

export interface PreguntaEmprendimientoRespuesta extends BaseRespuesta<PreguntaEmprendimiento[]> { }