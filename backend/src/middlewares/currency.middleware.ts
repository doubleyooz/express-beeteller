import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { getMessage } from '../utils/message.util';

const rules = {
    currency: yup
        .string()
        .matches(
            /^EUR-BRL$|^BTC-BRL$|^USD-BRL$|^BRL-USD$|^EUR-USD$|^BTC-EUR$|^BTC-USD$/,
        ),
    days: yup
        .number()
        .moreThan(0)
        .test(
            'Valid days',
            '${path} must be divisible for 30',
            value => value! % 30 === 0,
        ),
};

async function latelyPrice(req: Request, res: Response, next: NextFunction) {
    const yupObject = yup.object().shape({
        currency: rules.currency.required(),
        days: rules.days.required(),
    });

    yupObject
        .validate(req.query, { stripUnknown: true })
        .then(() => next())
        .catch((err: any) => {
            return res.status(400).json({
                message: getMessage('default.badRequest'),
                data: err.errors,
            });
        });
}

async function currentPrice(req: Request, res: Response, next: NextFunction) {
    const yupObject = yup.object().shape({
        body: yup.object().shape({}),
        query: yup.object().shape({}),
    });

    yupObject
        .validate({ body: req.body, query: req.query }, { stripUnknown: true })
        .then(() => {
            next();
        })
        .catch((err: any) => {
            return res.status(400).json({
                message: getMessage('default.badRequest'),
                data: err.errors,
            });
        });
}

async function getCurrency(req: Request, res: Response, next: NextFunction) {
    const yupObject = yup.object().shape({
        currency: rules.currency.required(),
    });

    yupObject
        .validate(req.query, { stripUnknown: true })
        .then(() => next())
        .catch((err: any) => {
            return res.status(400).json({
                message: getMessage('default.badRequest'),
                data: err.errors,
            });
        });
}

export default { getCurrency, currentPrice, latelyPrice };
