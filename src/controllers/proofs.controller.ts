import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { ProofsModel } from '../models/proofs.model';


export class ProofController {
    static proofrepository: Repository<ProofsModel>;

    static init() {
        ProofController.proofrepository = getRepository(ProofsModel);
    }
    static create = async (req: Request, res: Response) => {
        // console.log('avant', req.body.name);
        const newProof = ProofController.proofrepository?.create(req.body);
        await ProofController.proofrepository?.save(newProof);
        return res.json(newProof);
    };
    static findAll = async (req: Request, res: Response) => {
        const proof = await ProofController.proofrepository?.find();
        return res.json({ proof });
    };

    static findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const proof = await ProofController.proofrepository?.findOne(id);
        if (proof === undefined) {
            throw new Error('Proof not found');
        }
        return res.json(proof);
    }

    static update = async (req: Request, res: Response) => {
        const preloadedProof = await ProofController.proofrepository?.preload({
            id : parseInt(req.params.id),
            ...req.body
        });
        if (preloadedProof === undefined) {
            throw new Error(`Proof ${req.params.id} not found`);
        }
        await ProofController.proofrepository?.save(preloadedProof);
        return res.json(preloadedProof);
    }
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const proofToDelete = await ProofController.proofrepository?.findOne(id, {
            withDeleted : true
        });
        if (proofToDelete === undefined) {
            throw new Error(`Proof ${req.params.id} not found`);
        }
        await ProofController.proofrepository?.softRemove(proofToDelete);
        return res.json({status: 'soft deleted'});
    }
}