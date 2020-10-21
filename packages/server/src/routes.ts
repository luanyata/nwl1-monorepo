import { Router } from 'express';
import PointController from './controllers/PointsController';
import ItemsController from './controllers/ItemsContoller';

const routes = Router();
const pointsController = new PointController();
const itemController = new ItemsController();

routes.get('/items', itemController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
