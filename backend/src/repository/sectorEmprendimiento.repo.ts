import SectorEmprendimientoDto from "../dtos/sectorEmprendimiento.dto";
import { SectorEmprendimiento } from '../models/sectorEmprendimiento.model';

class SectorEmprendimientoRepo {


    async create(sectorEmprendimientoDto: SectorEmprendimientoDto): Promise<SectorEmprendimientoDto> {
        try {
            let sectorEmprendimientoModel = new SectorEmprendimiento({
                sector: sectorEmprendimientoDto.getSector(),
                descripcion: sectorEmprendimientoDto.getDescripcion()
            });
            let createdDocument = await SectorEmprendimiento.create(sectorEmprendimientoModel);
            let createdSectorEmprendimientoDocument: SectorEmprendimientoDto = new SectorEmprendimientoDto(createdDocument);
            return createdSectorEmprendimientoDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async obtenerSectorEmprendimiento(): Promise<SectorEmprendimientoDto[]> {
        try {
            let sectorEmprendimientoArray: SectorEmprendimientoDto[] = [];
            let docs = await SectorEmprendimiento.find();
            docs.forEach((sectorEmprendimientoDocument: any) => {
                sectorEmprendimientoArray.push(new SectorEmprendimientoDto(sectorEmprendimientoDocument));
            });
            return sectorEmprendimientoArray;
        } catch (error) {
            return reject (error);
        }
    }

}

export default SectorEmprendimientoRepo;
function reject(error: unknown): SectorEmprendimientoDto[] | PromiseLike<SectorEmprendimientoDto[]> {
    throw new Error("Function not implemented.");
}

