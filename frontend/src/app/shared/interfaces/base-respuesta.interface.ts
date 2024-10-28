export interface BaseRespuesta<T> {
    ok: boolean;
    data: T;
    message?: string;
    error?: string;
}