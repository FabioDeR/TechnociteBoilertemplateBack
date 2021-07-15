import { getRepository, Repository } from 'typeorm';
import { InstructorChecks } from '../models/instructorChecks.model';
import { Request, Response } from 'express';
import { RecordsModel } from '../models/records.model';

export class InstructorChecksController {
    static checkRepository: Repository<InstructorChecks>;
    static recordRepository: Repository<RecordsModel>;

    static init() {
        InstructorChecksController.checkRepository = getRepository(InstructorChecks);
        InstructorChecksController.recordRepository = getRepository(RecordsModel);
    }
    static create = async (req: Request, res: Response) => {
        //quand recordcheck = false => update record -> recordStatus = absent
        // console.log('avant', req.body.name);
        req.body.records = await InstructorChecksController.recordRepository?.findOne(req.body.records);
        const newCheck = InstructorChecksController.checkRepository?.create(req.body);
        await InstructorChecksController.checkRepository?.save(newCheck);
        return res.json(newCheck);
    };
    static findAll = async (req: Request, res: Response) => {
        const checks = await InstructorChecksController.checkRepository?.find();
        return res.json({ checks });
    };
    static findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const InstructorChecks = await InstructorChecksController.checkRepository?.findOne(id);
        if (InstructorChecks === undefined) {
            throw new Error('Instructor check not found');
        }
        return res.json(InstructorChecks); 
    };
    static update = async (req: Request, res: Response) => {
        const preloadedIntructorChecks = await InstructorChecksController.checkRepository?.preload({
            id : parseInt(req.params.id),
            ...req.body
        });
        if (preloadedIntructorChecks === undefined) {
            throw new Error(`Instructor check ${req.params.id} not found`);
        }
        await InstructorChecksController.checkRepository?.save(preloadedIntructorChecks);
        return res.json(preloadedIntructorChecks);
    }
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const instructorChecksToDelete = await InstructorChecksController.checkRepository?.findOne(id, {
            withDeleted : true
        });
        if (instructorChecksToDelete === undefined) {
            throw new Error(`Instructor check ${req.params.id} not found`);
        }
        await InstructorChecksController.checkRepository?.softRemove(instructorChecksToDelete);
        return res.json({status: 'soft deleted'});
    }
    
}