export default class EtapaPitchDto {
    private _id?: string;
    private emprendimiento: string;
    private emprendedor: string;
    private idSector: string;
    private idInstitucion: string;
    private idPais: string;
    private promedio: Number;
    private estado: String;
    private institucion: String;
    private pais: String;
    private integrantes: String;
    private sector: String;
    private correoElectronicoPersonal: String;
    private correoElectronicoInstitucional: String;
    private pasaAPitch: Boolean;

    constructor(data?: any) {
        if(!data){
            this.emprendimiento = "";
            this.emprendedor = "";
            this.idSector = "";
            this.idInstitucion = "";
            this.idPais = "";
            this.promedio = 0;
            this.estado = "";
            this.institucion = "";
            this.pais = "";
            this.integrantes = "";
            this.sector = "";
            this.correoElectronicoPersonal = "";
            this.correoElectronicoInstitucional = "";
            this.pasaAPitch = false;
        } else {
            this._id = data.id;
            this.emprendimiento = data.emprendimiento;
            this.emprendedor = data.emprendedor;
            this.idSector = data.idSector;
            this.idInstitucion = data.idInstitucion;
            this.idPais = data.idPais;
            this.promedio = data.promedio;
            this.estado = data.estado;
            this.institucion = data.institucion;
            this.pais = data.pais;
            this.integrantes = data.integrantes;
            this.sector = data.sector;
            this.correoElectronicoPersonal = data.correoElectronicoPersonal;
            this.correoElectronicoInstitucional = data.correoElectronicoInstitucional;
            this.pasaAPitch = data.pasaAPitch;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getEmprendimiento(): String {
        return this.emprendimiento
    }

    getPromedio(): Number {
        return this.promedio
    }

    getEmprendedor(): String {
        return this.emprendedor
    }

    getIdSector(): String {
        return this.idSector
    }

    getIdInstitucion(): String {
        return this.idInstitucion
    }

    getPais(): String {
        return this.pais
    }

    getEstado(): String {
        return this.estado
    }

    getInstitucion(): String {
        return this.institucion
    }

    getIdPais(): String{
        return this.idPais
    }

    getIntegrantes(): String{
        return this.integrantes
    }

    getSector(): String {
        return this.sector
    }

    getCorreoElecgetCorreoElectronicoPersonal(): String {
        return this.correoElectronicoPersonal;
    }

    getCorreoElectronicoInstitucional(): String {
        return this.correoElectronicoInstitucional;
    }

    getPasaAPitch(): Boolean {
        return this.pasaAPitch
    }
}