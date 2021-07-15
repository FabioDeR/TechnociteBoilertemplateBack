import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { ProofsModel } from '../models/proofs.model';
import { RecordsModel } from '../models/records.model';


export class RecordsController {
    static recordRepository: Repository<RecordsModel>;
    static proofsRepository: Repository<ProofsModel>;

    static init() {
     RecordsController.recordRepository = getRepository(RecordsModel);
     RecordsController.proofsRepository = getRepository(ProofsModel);
    }
    static create = async (req: Request, res: Response) => {
        // console.log('avant', req.body.name);
        const proofs = await RecordsController.proofsRepository?.findByIds(req.body.proofs);
        const newRecord = RecordsController.recordRepository?.create({
            dateOfDay : req.body.dateOfDay,
            comment : req.body.comment,
            period : req.body.period,
            recordStatus : req.body.recordStatus,
            proofs 
        });
        await RecordsController.recordRepository?.save(newRecord);
        return res.json(newRecord);
    };
    static findAll = async (req: Request, res: Response) => {
        const records = await RecordsController.recordRepository?.find();
        return res.json({ records });
    };
    static findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const record = await RecordsController.recordRepository?.findOne(id);
        if (record === undefined) {
            throw new Error('Record not found');
        }
        return res.json(record); 
    };
    static update = async (req: Request, res: Response) => {
        const preloadedRecord = await RecordsController.recordRepository?.preload({
            id : parseInt(req.params.id),
            ...req.body
        });
        if (preloadedRecord === undefined) {
            throw new Error(`Record ${req.params.id} not found`);
        }
        await RecordsController.recordRepository?.save(preloadedRecord);
        return res.json(preloadedRecord);
    }
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const recordToDelete = await RecordsController.recordRepository?.findOne(id, {
            withDeleted : true
        });
        if (recordToDelete === undefined) {
            throw new Error(`Record ${req.params.id} not found`);
        }
        await RecordsController.recordRepository?.softRemove(recordToDelete);
        return res.json({status: 'soft deleted'});
    }
    
}