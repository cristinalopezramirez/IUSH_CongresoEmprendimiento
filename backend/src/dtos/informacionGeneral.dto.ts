

export default class InformacionGeneralDto{
    private _id?: string;
    private nombres: string;
    private apellidos: string;
    private pais: string;
    private ciudadResidencia: string;
    //private tipoDocumento: string;
    private documentoIdentidad: string;
    private correoElectronicoPersonal: string;
    private correoElectronicoInstitucional: string;
    private numeroTelefono: string;
    private idIES: string;
    private programaAcademico: string;

    constructor(data?: any) {
        if (!data) {
            this.nombres = "";
            this.apellidos = "";
            this.pais = "";
            this.ciudadResidencia = "";
            //this.tipoDocumento = "";
            this.documentoIdentidad = "";
            this.correoElectronicoPersonal = "";
            this.correoElectronicoInstitucional = "";
            this.numeroTelefono = "";
            this.idIES = "";
            this.programaAcademico = "";
        } else {
            this._id = data.id;
            this.nombres = data.nombres;
            this.apellidos = data.apellidos;
            this.pais = data.pais;
            this.ciudadResidencia = data.ciudadResidencia;
            //this.tipoDocumento = data.tipoDocumento;
            this.documentoIdentidad = data.documentoIdentidad;
            this.correoElectronicoPersonal = data.correoElectronicoPersonal;
            this.correoElectronicoInstitucional = data.correoElectronicoInstitucional;
            this.numeroTelefono = data.numeroTelefono;
            this.idIES = data.idIES;
            this.programaAcademico = data.programaAcademico;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getNombres(): string {
        return this.nombres;
    }

    getApellidos(): string {
        return this.apellidos
    }

    getPais(): string {
        return this.pais;
    }

    getCiudadResidencia(): string {
        return this.ciudadResidencia;
    }
/*
    getTipoDocumento(): string {
        return this.tipoDocumento;
    }
*/
    getDocumentoIdentidad(): string {
        return this.documentoIdentidad;
    }

    getCorreoElectronicoPersonal(): string {
        return this.correoElectronicoPersonal;
    }

    getCorreoElectronicoInstitucional(): string {
        return this.correoElectronicoInstitucional;
    }

    getNumeroTelefono(): string {
        return this.numeroTelefono;
    }

    getIdIES(): string {
        return this.idIES;
    }

    getProgramaAcademico(): string {
        return this.programaAcademico;
    }

}

