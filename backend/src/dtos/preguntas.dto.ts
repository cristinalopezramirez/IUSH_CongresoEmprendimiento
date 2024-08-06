export default class PreguntasDto {
    private _id?: string;
    private year: number;
    private numero: number;
    private pregunta: string;

    constructor (data?: any) {
        if(!data){
            this.year = 0;
            this.numero = 0;
            this.pregunta = "";
        } else {
            this._id = data.id;
            this.year = data.year;
            this.numero = data.numero;
            this.pregunta = data.pregunta;
        }
    }

    getId(): string | undefined {
        return this._id;
    }

    getYear(): number {
        return this.year;
    }

    getNumero(): number {
        return this.numero;
    }

    getPregunta(): string {
        return this.pregunta;
    }

}