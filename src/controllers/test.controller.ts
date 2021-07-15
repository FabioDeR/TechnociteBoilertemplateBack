import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { TestModel } from '../models/test.model';

export class TestController {
    static testRepository: Repository<TestModel>;

    static init() {
        TestController.testRepository = getRepository(TestModel);
    }

    static create = async (req: Request, res: Response) => {
        // console.log('avant', req.body.name);
        const newTest = TestController.testRepository?.create(req.body);
        await TestController.testRepository?.save(newTest);
        return res.json(newTest);
    };

    static findAll = async (req: Request, res: Response) => {
        const test = await TestController.testRepository?.find();
        return res.json({ test });
    };
}
