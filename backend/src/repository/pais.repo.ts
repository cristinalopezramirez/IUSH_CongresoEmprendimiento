import PaisDto from "../dtos/pais.dto";
import { Pais } from "../models/pais.model"

class PaisRepo {


    async create(paisDto: PaisDto): Promise<PaisDto> {
        try {
            let paisModel = new Pais({
                nombre: paisDto.getNombre(),
                descripcion: paisDto.getDescripcion()
            });
            let createdDocument = await Pais.create(paisModel);
            let createdPaisDocument: PaisDto = new PaisDto(createdDocument);
            return createdPaisDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtenerPais(): Promise<PaisDto[]> {
        try {
            let paisArray: PaisDto[] = [];
            let docs = await Pais.find();
            docs.forEach((paisDocument: any) => {
                paisArray.push(new PaisDto(paisDocument));
            });
            return paisArray;
        } catch (error) {
            return reject (error);
        }
    }

    async ubicarUniversidadEnPais(nombre: string): Promise<PaisDto[]> {
        try {
            let pais = await Pais.aggregate([
                {
                  '$match': {
                    'nombre': nombre
                  }
                }
              ]);
              return pais
        } catch (error) {
            throw new Error ("Universidad no ubicada en país");
        }
    }

}

export default PaisRepo;
function reject(error: unknown): PaisDto[] | PromiseLike<PaisDto[]> {
    throw new Error("Function not implemented.");
}