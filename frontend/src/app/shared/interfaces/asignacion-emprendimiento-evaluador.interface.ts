import { BaseRespuesta } from "./base-respuesta.interface";
import { Emprendimiento } from "./emprendimiento.interface";

export interface AsignacionEmprendimientoEvaluador {
    _id?: string;
    idEvaluador: string;
    emprendimientos: string[];
    informacionEmprendimiento?: Emprendimiento;
}

export interface AsignacionEmprendimientoEvaluadorCreadoRespuesta extends BaseRespuesta<AsignacionEmprendimientoEvaluador> { };
export interface EmprendimientoAsignadoEvaluadorRespuesta extends BaseRespuesta<AsignacionEmprendimientoEvaluador[]> { };
