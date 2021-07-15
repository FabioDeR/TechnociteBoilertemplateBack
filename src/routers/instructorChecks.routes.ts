import { Router } from 'express';
import { InstructorChecksController } from '../controllers/instructorChecks.controller';

const route = Router();

route.post('/api/v1/instructorChecks', InstructorChecksController.create);
route.get('/api/v1/instructorChecks', InstructorChecksController.findAll);
route.get('/api/v1/instructorChecks/:id', InstructorChecksController.findById);
route.put('/api/v1/instructorChecks', InstructorChecksController.update);
route.delete('/api/v1/instructorChecks', InstructorChecksController.delete);


export {route as apiInstructorChecksRouter};