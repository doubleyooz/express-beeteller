import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { hashPassword } from '../utils/password.util';
import { getMessage } from '../utils/message.util';
import mongoose from 'mongoose';

async function store(req: Request, res: Response) {
    const { email, password }: IUser = req.body;

    const newUser: IUser = new User({
        email: email,
        password: await hashPassword(password),
    });

    newUser
        .save()
        .then(result => {
            return res.status(200).json({
                data: { email: result.email, _id: result._id },
                message: getMessage('user.valid.sign_up.success'),
            });
        })
        .catch(err => {
            if (err.name === 'MongoServerError' && err.code === 11000) {
                //There was a duplicate key error
                return res.status(400).json({
                    message: getMessage('user.invalid.email.duplicate'),
                    err: err,
                });
            }
            return res.status(400).json({
                message: getMessage('default.badRequest'),
                err: err,
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
            return res.status(500).json({
                err: err,
                message: getMessage('default.serverError'),
            });
        });
}

async function findOne(req: Request, res: Response) {
    const { _id } = req.query;

    User.findById(_id)
        .then(result => {
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: getMessage('user.findOne.success'),
                });
            }
            return res.status(404).json({
                message: getMessage('user.notfound'),
            });
        })
        .catch(err => {
            console.log(err);
            return res
                .status(500)
                .json({ err: err, message: getMessage('default.serverError') });
        });
}

async function remove(req: Request, res: Response) {
    const { _id } = req.query;

    User.deleteOne({ _id: _id })
        .then(result => {
            switch (result.deletedCount) {
                case 1:
                    return res.status(200).json({
                        message: getMessage('user.delete.success'),
                    });
                    break;
                case 0:
                    return res.status(404).json({
                        message: getMessage('user.notfound'),
                    });
                    break;
                default:
                    return res.status(500).json({
                        message: getMessage('default.serverError'),
                    });
                    break;
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: getMessage('default.serverError'),
            });
        });
}

export default { store, findOne, list, remove };
