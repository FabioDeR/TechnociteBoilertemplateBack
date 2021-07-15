import { Router } from 'express';
import { ProofController } from '../controllers/proofs.controller';

const route = Router();

route.post('/api/v1/proofs', ProofController.create);
route.get('/api/v1/proofs', ProofController.findAll);
route.get('/api/v1/proofs/:id', ProofController.findById);
route.put('/api/v1/proofs', ProofController.update);
route.delete('/api/v1/proofs', ProofController.delete);


export {route as apiProofRouter};