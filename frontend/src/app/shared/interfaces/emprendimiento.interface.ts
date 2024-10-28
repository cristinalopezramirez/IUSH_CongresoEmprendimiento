import { BaseRespuesta } from "./base-respuesta.interface";
import { Emprendedor } from "./emprendedor.interface";
import { Institucion } from "./institucion.interface";
import { Pais } from "./pais.interface";
import { RespuestaPregunta } from "./respuesta-pregunta.interface";
import { Sector } from "./sector.interface";

export interface Emprendimiento {
    _id?: string;
    idSector: string;
    idIES: string;
    nombreInstitucion?: string;
    idEmprendedor?: string;
    fecha: string;
    fechaInscripcion?: string;
    descripcionIdea?: string;
    propuestaSolucion?: string;
    estado?: string;
    nombreSector?: string;
    numeroEmprendimiento?: number;
    asignado?: boolean;
    sector?: Sector;
    infoEmprendedor?: Emprendedor;
    IES?: Institucion;
    pais?: Pais;
    respuestas: RespuestaPregunta[];
}

export interface RespuestaEmprendimiento extends BaseRespuesta<Emprendimiento[]> { };
export interface RespuestaEmprendimientoCreado extends BaseRespuesta<Emprendimiento> { };