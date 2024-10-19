/*
evaluador
    numeroEmprendimiento
    emprendimiento
    evaluacionPitch
    promedio
    */

export default class EvaluacionEtapaPitchDto {
    private _id?: string;
    private evaluador: any;
    private numeroEmprendimiento: Number;
    private emprendimiento: any;
    private evaluacionPitch: [];
    private promedio: number;

    constructor(data?: any) {
        if(!data) {
            this.evaluador = "";
            this.numeroEmprendimiento = 0;
            this.emprendimiento = "";
            this.evaluacionPitch = [];
            this.promedio = 0;
        } else {
            this._id = data.id;
            this.evaluador = data.evaluador;
            this.numeroEmprendimiento = data.numeroEmprendimiento;
            this.emprendimiento = data.emprendimiento;
            this.evaluacionPitch = data.evaluacionPitch;
            this.promedio = data.promedio;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getEvaluador(): string {
        return this.evaluador;
    }

    getNumeroEmprendimiento() {
        return this.numeroEmprendimiento;
    }

    getEmprendimiento(): string {
        return this.emprendimiento;
    }

    getEvaluacionPitch() {
        return this.evaluacionPitch;
    }

    getPromedio() {
        return this.promedio;
    }
}