import { Router } from 'express';
import { RecordsController } from '../controllers/records.controller';

const route = Router();

route.post('/api/v1/records', RecordsController.create);
route.get('/api/v1/records', RecordsController.findAll);
route.get('/api/v1/records/:id', RecordsController.findById);
route.put('/api/v1/records', RecordsController.update);
route.delete('/api/v1/records', RecordsController.delete);


export {route as apiRecordRouter};