import { Router, Request, Response } from 'express';
import CurrencyController from '../controllers/currency.controller';


const routes = Router();

routes.get('/currencies', CurrencyController.getCurrency);
routes.get('/currencies/now', CurrencyController.currentPrice);
routes.get('/currencies/lately', CurrencyController.latelyPrice);

export default routes;