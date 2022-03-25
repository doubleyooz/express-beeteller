import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const routes = Router();

routes.get('/sign-in', AuthController.signIn);

export default routes;
