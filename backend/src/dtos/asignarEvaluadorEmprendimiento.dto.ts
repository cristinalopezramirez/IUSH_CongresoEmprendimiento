

export default class AsignarEvaluadorEmprendimientoDto {
    private _id?: string;
    private idEvaluador: any;
    private emprendimientos: [];

    constructor(data?: any) {
        if (!data) {
            this.idEvaluador = "";
            this.emprendimientos = [];
        } else {
            this._id = data.id;
            this.idEvaluador = data.idEvaluador;
            this.emprendimientos = data.emprendimientos;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getIdEvaluador(): string {
        return this.idEvaluador;
    }

    getEmprendimientos() {
        return this.emprendimientos;
    }

}