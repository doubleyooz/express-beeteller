import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { hashPassword } from '../utils/password.util';

async function store(req: Request, res: Response) {
    const { email, password }: IUser = req.body;

    const newUser: IUser = new User({
        email: email,
        password: await hashPassword(password),
    });

    newUser
        .save()
        .then(result => {
            return res
                .status(201)
                .json({ message: 'user saved', data: { email: result.email } });
        })
        .catch((err)=> {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                //next(new Error("There was a duplicate key error"));
                return res.status(400).json({
                    message: 'duplicatekey',
                    data: { err },
                });
            }
            return res
                .status(400)
                .json({
                    message: "you didn't gave what we want",
                    data: { err },
                });
        });
}

export default { store };
