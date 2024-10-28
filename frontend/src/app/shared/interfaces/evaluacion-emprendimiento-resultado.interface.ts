import { BaseRespuesta } from "./base-respuesta.interface";

export interface ResultadoEvaluacionEmprendimiento {
    _id?: string;
    emprendimiento: string;
    promedio: number;
    idSector: string;
    idInstitucion: string;
    idPais: string;
    estado: string;
    institucion: string;
    pais: string;
    emprendedor: string;
    integrantes: string;
    sector: string;
    correoElectronicoPersonal: string;
    correoElectronicoInstitucional: string;
    pasaAPitch: boolean;
}

export class EvaluacionPitch {
    _id?: string;
    evaluador: string;
    emprendimiento: string;
    evaluacionPitch: PreguntaPitch[] = [];

    constructor(evaluador: string, emprendimiento: string, evaluacionPitch: PreguntaPitch[]) {
        this.evaluador = evaluador;
        this.emprendimiento = emprendimiento;
        this.evaluacionPitch = evaluacionPitch;
    }
}

export class PreguntaPitch {
    pregunta: string;
    valor: number

    constructor(pregunta: string, valor: number) {
        this.pregunta = pregunta;
        this.valor = valor;
    }
}

export interface RespuestaResultadoEvaluacionEmprendimiento extends BaseRespuesta<ResultadoEvaluacionEmprendimiento[]> { };

export interface RespuestaEvlauacionPitchCreada extends BaseRespuesta<EvaluacionPitch> { };