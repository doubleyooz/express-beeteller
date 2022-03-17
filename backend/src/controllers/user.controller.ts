import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { hashPassword } from '../utils/password.util';
import { getMessage } from '../utils/message.util';

async function store(req: Request, res: Response) {
    const { email, password }: IUser = req.body;

    const newUser: IUser = new User({
        email: email,
        password: await hashPassword(password),
    });

    newUser
        .save()
        .then(result => {
            return res.status(201).json({
                message: getMessage('user.valid.sign_up.sucess'),
                data: { email: result.email },
            });
        })
        .catch(err => {
            if (err.name === 'MongoServerError' && err.code === 11000) {
                //There was a duplicate key error
                return res.status(400).json({
                    message: getMessage('user.invalid.email.duplicate'),
                    data: { err },
                });
            }
            return res.status(400).json({
                message: getMessage('default.badRequest'),
                data: { err },
            });
        });
}

async function list(req: Request, res: Response) {
    const { skip } = req.body;

    User.find()
        .sort('updatedAt')
        .skip(skip)
        .limit(10)
        .then(doc => {
            return res.status(201).json({
                data: doc,
                message: getMessage('user.list.success'),
            });
        })
        .catch(err => {
            return res
                .status(500)
                .json({
                    data: err,
                    message: getMessage('default.serverError'),
                });
        });
}

export default { store, list };
