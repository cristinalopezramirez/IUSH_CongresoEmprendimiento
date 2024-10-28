import { BaseRespuesta } from "./base-respuesta.interface";

export interface Institucion {
    _id?: string;
    nombre: string;
    paisIES: string;
    nombrePais?: string;
    regionDepartamento: string;
    nombreLiderIES: string;
    correoContacto: string;
    telefonoContacto: string;
    urlOficial: string;
}

export interface InstitucionRespuesta extends BaseRespuesta<Institucion[]> { }
export interface InstitucionCreadaRespuesta extends BaseRespuesta<Institucion> { }
