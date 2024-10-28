import { BaseRespuesta } from "./base-respuesta.interface";

export class EvaluacionEmprendimiento {
    _id?: string;
    evaluador: string;
    emprendimiento: string;
    evaluacion: Evaluacion[];

    constructor(evaluador: string, emprendimiento: string, evaluacion: Evaluacion[]) {
        this.evaluador = evaluador;
        this.emprendimiento = emprendimiento;
        this.evaluacion = evaluacion;
    }
}

export class Evaluacion {
    _id?: string;
    etapa: string;
    preguntas: Pregunta[];

    constructor(etapa: string, preguntas: Pregunta[]) {
        this.etapa = etapa;
        this.preguntas = preguntas;
    }
}

export class Pregunta {
    pregunta: string;
    descripcion: string;
    puntaje: number;
    _id?: string;

    constructor(pregunta: string, descripcion: string, puntaje: number) {
        this.pregunta = pregunta;
        this.descripcion = descripcion;
        this.puntaje = puntaje;
    }
}

export interface EvaluacionEmprendimientoCreadaRespuesta extends BaseRespuesta<EvaluacionEmprendimiento> { };
