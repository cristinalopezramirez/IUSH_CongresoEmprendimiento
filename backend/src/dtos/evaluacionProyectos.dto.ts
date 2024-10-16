

export default class EvaluacionProyectosDto {
    private _id?: string;
    private evaluador: any;
    private emprendimiento: any;
    private evaluacion: [];
    private promedio: number;
    private pasaAPitch: boolean;

    constructor(data?: any) {
        if(!data) {
            this.evaluador = "";
            this.emprendimiento = "";
            this.evaluacion = [];
            this.promedio = 0;
            this.pasaAPitch = false;
        } else {
            this._id = data.id;
            this.evaluador = data.evaluador;
            this.emprendimiento = data.emprendimiento;
            this.evaluacion = data.evaluacion;
            this.promedio = data.promedio;
            this.pasaAPitch = data.pasaAPitch;
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

    getPromedio() {
        return this.promedio;
    }

    getPasaAPitch() { 
        return this.pasaAPitch
    }
}