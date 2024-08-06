

export default class TestDto {
    private _id?: string;
    private nombre: string;
    private cantidad: number;
    private activo: boolean;


    constructor(data?: any) {
        if (!data) {
            this.nombre = "";
            this.cantidad = 0;
            this.activo = false;
        } else {
            this._id = data.id;
            this.nombre = data.nombre;
            this.cantidad = data.cantidad;
            this.activo = data.activo;
        }
    }


    getId(): string | undefined {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getCantidad(): Number {
        return this.cantidad;
    }

    getActivo(): boolean {
        return this.activo;
    }
}