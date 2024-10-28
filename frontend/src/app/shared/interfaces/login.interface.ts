import { BaseRespuesta } from "./base-respuesta.interface";

export interface Login {
    _id?: string;
}

export interface LoginRespuesta extends BaseRespuesta<Login> { }
