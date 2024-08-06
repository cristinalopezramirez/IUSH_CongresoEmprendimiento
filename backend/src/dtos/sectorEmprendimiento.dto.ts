

export default class sectorEmprendimientoDto {
    private _id?: string;
    private sector: string;
    private descripcion: string;


    constructor(data?: any) {
        if (!data) {
            this.sector = "";
            this.descripcion = "";
        } else {
            this._id = data.id;
            this.sector = data.sector;
            this.descripcion = data.descripcion;
        }
    }


    getId(): string | undefined {
        return this._id;
    }

    getSector(): string {
        return this.sector;
    }

    getDescripcion(): string {
        return this.descripcion;
    }


}