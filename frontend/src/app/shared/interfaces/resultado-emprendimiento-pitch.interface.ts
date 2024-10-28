import { BaseRespuesta } from "./base-respuesta.interface";

export interface ResultadoEmprendimientoPitch {
    _id?: string;
    promedio: number;
    emprendimiento: string;
    sector: string;
    estado: string;
    institucion: string;
    pais: string;
    nombreCompleto: string;
    correoElectronicoPersonal: string;
    correoElectronicoInstitucional: string;
}

export interface RespuestaResultadoEmprendimientoPitch extends BaseRespuesta<ResultadoEmprendimientoPitch[]> { };