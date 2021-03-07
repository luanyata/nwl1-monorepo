import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';
import multerConfig from '../config/multer';
import PointController from './controllers/PointsController';
import ItemsController from './controllers/ItemsContoller';

const routes = Router();
const upload = multer(multerConfig);
const pointsController = new PointController();
const itemController = new ItemsController();

routes.get('/items', itemController.index);

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false },
  ),
  pointsController.create,
);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
