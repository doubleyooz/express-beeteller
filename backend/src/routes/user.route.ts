import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';

const routes = Router();

routes.post('/users', UserMiddleware.store, UserController.store);
routes.get('/users', UserController.list);

export default routes;