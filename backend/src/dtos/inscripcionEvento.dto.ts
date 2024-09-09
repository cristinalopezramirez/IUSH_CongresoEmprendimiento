export default class InscripcionEventoDto {
    private _id?: string;
    private nombres: string;
    private apellidos: string;
    private correo: string;
    private telefono: string;
    private pais: string;
    private ciudad: string;
    private tipoAsistente: string;
    private interesesEvento: [];
    private comoTeEnterasteEvento: [];
    private aceptaEnvioComunicacion:  boolean;
    private aceptaTerminosYCondicionesTratamientoDatos:  boolean;



    constructor(data?: any) {
        if(!data) {
            this.nombres =  "";
            this.apellidos =  "";
            this.correo =  "";
            this.telefono =  "";
            this.pais =  "";
            this.ciudad =  "";
            this.tipoAsistente =  "";
            this.interesesEvento = [];
            this.comoTeEnterasteEvento =  [];
            this.aceptaEnvioComunicacion =  false; 
            this.aceptaTerminosYCondicionesTratamientoDatos = false; 
        } else {
            this._id =  data.id;
            this.nombres =  data.nombres;
            this.apellidos =  data.apellidos;
            this.correo =  data.correo;
            this.telefono =  data.telefono;
            this.pais =  data.pais;
            this.ciudad =  data.ciudad;
            this.tipoAsistente =  data.tipoAsistente;
            this.interesesEvento =  data.interesesEvento;
            this.comoTeEnterasteEvento =  data.comoTeEnterasteEvento;
            this.aceptaEnvioComunicacion =  data.aceptaEnvioComunicacion;
            this.aceptaTerminosYCondicionesTratamientoDatos =  data.aceptaTerminosYCondicionesTratamientoDatos;
        }
    }


    getId(): string | undefined {
        return this._id;
    }

    getNombres(): string {
        return this.nombres;
    }

    getApellidos(): string {
        return this.apellidos;
    }

    getCorreo(): string{
        return this.correo;
    }

    getTelefono(): string {
        return this.telefono;
    }

    getPais(): string {
        return this.pais;
    }

    getCiudad(): string { 
        return this.ciudad;
    }

    getTipoAsistente(): string {
        return this.tipoAsistente;
    }

    getInteresesEvento() {
        return this.interesesEvento;
    }

    getComoTeEnterasteEvento() {
        return this.comoTeEnterasteEvento;
    }

    getAceptarEnvioComunicacion(): boolean {
        return this.aceptaEnvioComunicacion;
    }

    getAceptaTerminosYCondicionesTratamientoDatos(): boolean {
        return this.aceptaTerminosYCondicionesTratamientoDatos;
    }
}       