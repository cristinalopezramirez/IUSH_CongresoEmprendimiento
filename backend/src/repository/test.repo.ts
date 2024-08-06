import TestDto from "../dtos/test.dto";
import { Test } from '../models/test.model';

class TestRepo {


    async create(testDto: TestDto): Promise<TestDto> {
        try {
            let testModel = new Test({
                nombre: testDto.getNombre(),
                cantidad: testDto.getCantidad(),
                activo: testDto.getActivo()
            });
            let createdDocument = await Test.create(testModel);
            let createdTestDocument: TestDto = new TestDto(createdDocument);
            return createdTestDocument;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtenerTest(): Promise<TestDto[]> {
        try {
            let testArray: TestDto[] = [];
            let docs = await Test.find();
            docs.forEach((testDocument: any) => {
                testArray.push(new TestDto(testDocument));
            });
            return testArray;
        } catch (error) {
            return reject (error);
        }
    }

}

export default TestRepo;

function reject(error: unknown): TestDto[] | PromiseLike<TestDto[]> {
    throw new Error("Function not implemented.");
}

