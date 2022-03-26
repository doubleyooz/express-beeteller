import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as yup from 'yup';
import { getMessage } from '../utils/message.util';

function isValidMongoIdRequired(value: string) {
    return (
        mongoose.Types.ObjectId.isValid(value) &&
        String(new mongoose.Types.ObjectId(value)) === value
    );
}

const rules = {
    email: yup.string().email(),
    password: yup
        .string()
        .min(8, getMessage('user.invalid.password.short'))
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            getMessage('user.invalid.password.weak'),
        ),
    mongoId: yup
        .string()
        .test('isValidMongoId', getMessage('invalid.object.id')!, value =>
            isValidMongoIdRequired(value!),
        ),
};

async function store(req: Request, res: Response, next: NextFunction) {
    const yupObject = yup.object().shape({
        email: rules.email.required(),
        password: rules.password.required(),
    });

    yupObject
        .validate(req.body, { stripUnknown: true })
        .then(() => next())
        .catch((err: any) => {
            return res.status(400).json({
                message: getMessage('default.badRequest'),
                data: err.errors,
            });
        });
}

async function findById(req: Request, res: Response, next: NextFunction) {
    const yupObject = yup.object().shape({
        _id: rules.mongoId.required(),
       
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

export default { store, findById };
