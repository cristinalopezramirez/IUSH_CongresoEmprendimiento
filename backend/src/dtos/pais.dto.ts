
export default class PaisDto {
    private _id?: string;
    private nombre: string;
    private descripcion: string;


    constructor(data?: any) {
        if (!data) {
            this.nombre = "";
            this.descripcion = "";
        } else {
            this._id = data.id;
            this.nombre = data.nombre;
            this.descripcion = data.descripcion;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getDescripcion(): string {
        return this.descripcion;
    }

}   