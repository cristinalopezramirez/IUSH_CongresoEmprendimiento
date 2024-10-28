import { BaseRespuesta } from "./base-respuesta.interface";

export interface InscripcionCongreso {
    _id?: string;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    pais: string;
    nombrePais?: string;
    ciudad: string;
    tipoAsistente: string;
    interesesEvento: InteresEvento[];
    comoTeEnterasteEvento: DivulgacionEvento[];
    aceptaEnvioComunicacion: boolean;
    aceptaTerminosYCondicionesTratamientoDatos: boolean;
}

export interface InteresEvento {
    pregunta: string;
    respuesta: string;
}

export interface DivulgacionEvento {
    pregunta: string;
    respuesta: boolean;
}

export interface InscritoExiste {
    existe: boolean;
}

export interface InscripcionCongresoCreadoRespuesta extends BaseRespuesta<InscripcionCongreso> { }

export interface InscripcionCongresoRespuesta extends BaseRespuesta<InscripcionCongreso[]> { }

export interface InscritoInvitadoEspecialExisteRespuesta extends BaseRespuesta<InscritoExiste> { };