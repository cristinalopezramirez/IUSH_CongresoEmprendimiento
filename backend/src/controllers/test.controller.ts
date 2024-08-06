import TestDto from "../dtos/test.dto";
import TestRepo from "../repository/test.repo";
import { Response, Request } from "express";





export let create = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let testDto = new TestDto(body);
        let testRepository = new TestRepo();

        let answ = await testRepository.create(testDto);

        res.json({
            ok: true,
            data: answ,
            message: 'Creado con éxito',
            error: null
        });

    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear un test'
        });
    }


}

export let obtenerTest = async (req: Request, res: Response) => {
    try {
        let testRepository = new TestRepo();

        let test = await testRepository.obtenerTest();

        res.json({
            ok: true,
            data: test,
            message: 'Todo ok',
            error: null
        })

    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'ocurrió un problema al traer los datos'
        })
    }
}

