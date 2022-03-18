import { Router, Request, Response } from 'express';
import CurrencyController from '../controllers/currency.controller';
import CurrencyMiddleware from '../middlewares/currency.middleware';

const routes = Router();

routes.get('/currencies', CurrencyController.getCurrency);
routes.get(
    '/currencies/now',
    CurrencyMiddleware.currentPrice,
    CurrencyController.currentPrice,
);
routes.get(
    '/currencies/lately',
    CurrencyMiddleware.latelyPrice,
    CurrencyController.latelyPrice,
);

export default routes;
