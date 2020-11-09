import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import PointController from './controllers/PointsController';
import ItemsController from './controllers/ItemsContoller';

const routes = Router();
const upload = multer(multerConfig);
const pointsController = new PointController();
const itemController = new ItemsController();

routes.get('/items', itemController.index);

routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
