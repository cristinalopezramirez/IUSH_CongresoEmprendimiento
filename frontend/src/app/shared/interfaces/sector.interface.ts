import { BaseRespuesta } from "./base-respuesta.interface";

export interface Sector {
    _id: string;
    sector: string;
    descripcion: string;
}

export interface SectorRespuesta extends BaseRespuesta<Sector[]> {};