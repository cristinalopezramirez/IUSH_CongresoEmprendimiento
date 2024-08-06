

export default class EvaluadorDto {
    private _id?: string;
    private nombre: string;
    private idIES: string;
    private telefono: string;
    private correo: string;
    private idPais: string;
    private documentoIdentidad: string;


    constructor(data?: any) {
        if(!data) {
            this.nombre = "";
            this.idIES = "";
            this.telefono = "";
            this.correo = "";
            this.idPais = "";
            this.documentoIdentidad = "";
        } else {
            this._id = data.id;
            this.nombre = data.nombre;
            this.idIES = data.idIES;
            this.telefono = data.telefono;
            this.correo = data.correo;
            this.idPais = data.idPais;
            this.documentoIdentidad = data.documentoIdentidad;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getIdIES(): String {
        return this.idIES;
    }

    getCorreo(): String {
        return this.correo;
    }

    getTelefono(): String {
        return this.telefono;
    }

    getIdPais(): String {
        return this.idPais;
    }

    getDocumentoIdentidad(): String {
        return this.documentoIdentidad;
    }
    
}

