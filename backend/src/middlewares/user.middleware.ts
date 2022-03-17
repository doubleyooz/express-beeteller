import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { getMessage } from '../utils/message.util';

const rules = {
    email: yup.string().email(),
    password: yup
        .string()
        .min(8, getMessage('user.invalid.password.short'))
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            getMessage('user.invalid.password.weak'),
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

export default { store };
