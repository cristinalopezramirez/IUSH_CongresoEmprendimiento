
export default class AdministradorDto {
    private _id?: string;
    private nombre: string;
    private telefono: string;
    private correo: string;
    private documentoIdentidad: string;


    constructor(data?: any){
        if(!data) {
            this.nombre = "";
            this.telefono = "";
            this.correo = "";
            this.documentoIdentidad = "";
        } else {
            this._id = data.id;
            this.nombre = data.nombre;
            this.telefono = data.telefono;
            this.correo = data.correo;
            this.documentoIdentidad = data.documentoIdentidad;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getCorreo(): String {
        return this.correo;
    }

    getTelefono(): String {
        return this.telefono;
    }

    getDocumentoIdentidad(): String {
        return this.documentoIdentidad;
    }
}
