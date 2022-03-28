import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const routes = Router();

routes.get('/sign-in', AuthController.signIn);
routes.get('/refresh-token', AuthController.refreshAccessToken);
routes.get('/revoke-token', AuthController.revokeRefreshToken);

export default routes;
