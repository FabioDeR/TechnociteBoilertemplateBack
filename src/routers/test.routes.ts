import { Router } from 'express';
import { TestController } from '../controllers/test.controller';

const route = Router();

route.post('/api/v1/tests', TestController.create);
route.get('/api/v1/tests', TestController.findAll);

export { route as apiTestRouter };
