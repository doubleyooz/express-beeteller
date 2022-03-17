import { Router, Request, Response } from 'express';
import CurrencyController from '../controllers/currency.controller';


const routes = Router();

routes.get('/currencies', CurrencyController.getCurrency);

export default routes;