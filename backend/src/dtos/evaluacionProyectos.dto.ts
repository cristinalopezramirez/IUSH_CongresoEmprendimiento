

export default class EvaluacionProyectosDto {
    private _id?: string;
    private evaluador: any;
    private emprendimiento: any;
    private evaluacion: [];

    constructor(data?: any) {
        if(!data) {
            this.evaluador = "";
            this.emprendimiento = "";
            this.evaluacion = [];
        } else {
            this._id = data.id;
            this.evaluador = data.evaluador;
            this.emprendimiento = data.emprendimiento;
            this.evaluacion = data.evaluacion;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getEvaluador(): string {
        return this.evaluador;
    }

    getEmprendimiento(): string {
        return this.emprendimiento;
    }

    getEvaluacion() {
        return this.evaluacion;
    }
}