

export default class InformacionEmprendimientoDto {
    private _id?: string;
    private idSector: any;
    private idIES:any; 
    private idEmprendedor: any;
    private fecha: string;
    private fechaInscripcion: string;
    private respuestas: [];
    private estado: string;
    private numeroEmprendimiento: number;
    private descripcionIdea: string;
    private propuestaSolucion: string;

    constructor(data?: any) {
        if(!data) {
            this.idSector= ""; 
            this.idIES= ""; 
            this.idEmprendedor = "";
            this.fecha= ""; 
            this.fechaInscripcion = "";
            this.respuestas= []; 
            this.estado = "";
            this.numeroEmprendimiento = 0;
            this.descripcionIdea = "";
            this.propuestaSolucion = "";
        }else {
            this._id = data.id;
            this.idSector = data.idSector; 
            this.idIES = data.idIES; 
            this.idEmprendedor = data.idEmprendedor;
            this.fecha = data.fecha; 
            this.fechaInscripcion = data.fechaInscripcion;
            this.respuestas = data.respuestas; 
            this.estado = data.estado;
            this.numeroEmprendimiento = data.numeroEmprendimiento;
            this.descripcionIdea = data.descripcionIdea;
            this.propuestaSolucion = data.propuestaSolucion;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getIdSector(): string {
        return this.idSector;
    }

    getIdIES(): string {
        return this.idIES;
    }

    getIdEmprendedor (): string {
        return this.idEmprendedor;
    }

    getFecha(): string {
        return this.fecha;
    }

    getFechaInscripcion(): string {
        return this.fechaInscripcion;
    }

    getRespuestas() {
        return this.respuestas;
    }

    getEstado() { 
        return this.estado;
    }

    getNumeroEmprendimiento () {
        return this.numeroEmprendimiento
    }

    getDescripcionIdea () {
        return this.descripcionIdea
    }

    getPropuestaSolucion () {
        return this.propuestaSolucion
    }
}


