import { BaseRespuesta } from "./base-respuesta.interface";

export interface ConfirmacionAsistenciaCongreso {
    _id?: string;
    nombres: string;
    correo: string;
    telefono: string;
    titulo?: string;
    mensaje?: string;
}

export interface ConfirmacionAsistenciaCreada extends BaseRespuesta<ConfirmacionAsistenciaCongreso> { };