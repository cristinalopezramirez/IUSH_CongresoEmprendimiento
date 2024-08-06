

export default class InstitucionesEducativasDto {
    private _id?: string;
    private nombre: string;
    private paisIES: string;
    private regionDepartamento: String;
    private nombreLiderIES: String;
    private correoContacto: String;
    private telefonoContacto: String;
    private urlOficial: String;

    constructor(data?: any) {
        if (!data) {
            this.nombre = "";
            this.paisIES = "";
            this.regionDepartamento = "";
            this.nombreLiderIES = "";
            this.correoContacto = "";
            this.telefonoContacto = "";
            this.urlOficial = "";
        } else {
            this._id = data.id;
            this.nombre = data.nombre;
            this.paisIES = data.paisIES;
            this.regionDepartamento = data.regionDepartamento;
            this.nombreLiderIES = data.nombreLiderIES;
            this.correoContacto = data.correoContacto;
            this.telefonoContacto = data.telefonoContacto;
            this.urlOficial = data.urlOficial;
        }
    }


    getId(): string | undefined {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getPaisIES(): String {
        return this.paisIES;
    }

    getRegionDepartamento(): String {
        return this.regionDepartamento;
    }

    getNombreLiderIES(): String {
        return this.nombreLiderIES;
    }

    getCorreoContacto(): String {
        return this.correoContacto;
    }

    getTelefonoContacto(): String {
        return this.telefonoContacto;
    }

    getUrlOficial(): String {
        return this.urlOficial;
    }

}