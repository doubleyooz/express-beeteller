import { Request, Response } from 'express';

import jwt from '../utils/jwt.util';
import User from '../models/user.model';
import { getMessage } from '../utils/message.util';
import { matchPassword } from '../utils/password.util';

async function refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.jid;

    if (!refreshToken) {
        return res.status(401).json({
            message: getMessage('unauthorized.refresh.token.missing'),
        });
    }
    let payload: any = null;
    try {
        payload = jwt.verifyJwt(refreshToken, 2);
    } catch (err) {
        return res.status(401).json({
            message: getMessage('default.unauthorized'),
        });
    }
    if (!payload)
        return res.status(401).json({
            message: getMessage('default.unauthorized'),
        });

    User.exists({ _id: payload._id, tokenVersion: payload.tokenVersion })
        .then(result => {
            if (result) {
                const accessToken = jwt.generateJwt(
                    {
                        _id: payload._id,
                        tokenVersion: payload.tokenVersion,
                    },
                    1,
                );
                return res.status(200).json({
                    accessToken: accessToken,
                    message: getMessage('default.success'),
                });
            }
            return res.status(401).json({
                message: getMessage('default.unauthorized'),
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: getMessage('default.unauthorized'),
            });
        });
}

async function revokeRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.jid;

    if (!refreshToken) {
        return res.status(401).json({
            message: getMessage('unauthorized.refresh.token.missing'),
        });
    }

    let payload: any = null;
    try {
        payload = jwt.verifyJwt(refreshToken, 2);
    } catch (err) {
        if (err instanceof Error) throw new Error(err.message);
        else throw new Error(getMessage('default.unauthorized'));
    }

    if (!payload)
        return res.status(401).json({
            message: getMessage('default.unauthorized'),
        });

    User.findById(payload._id)
        .then(user => {
            if (user) {
                user.tokenVersion += 1;
                user.save()
                    .then(result => {
                        return res.status(200).json({
                            message: getMessage('default.success'),
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: getMessage('default.serverError'),
                            err: err,
                        });
                    });
            } else {
                return res.status(401).json({
                    message: getMessage('default.unauthorized'),
                });
            }
        })
        .catch(err => {
            return res.status(401).json({
                message: getMessage('default.unauthorized'),
            });
        });
}

const signIn = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: getMessage('default.unauthorized'),
        });
    }
    const [hashType, hash] = req.headers.authorization!.split(' ');

    if (hashType !== 'Basic') {
        return res.status(401).json({
            message: getMessage('default.unauthorized'),
        });
    }

    const [email, supposedPassword] = Buffer.from(hash, 'base64')
        .toString()
        .split(':');

    const user = await User.findOne({ email: email }).select([
        'password',
        'tokenVersion',
    ]);
    const match = user
        ? await matchPassword(user.password, supposedPassword)
        : null;

    if (!match) {
        return res.status(401).json({
            message: getMessage('default.unauthorized'),
        });
    }

    const token = jwt.generateJwt(
        {
            _id: user!._id,
            tokenVersion: user!.tokenVersion,
        },
        1,
    );
    const refreshToken = jwt.generateJwt(
        {
            _id: user!._id,
            tokenVersion: user!.tokenVersion,
        },
        2,
    );

    req.headers.authorization = `Bearer ${token}`;

    res.cookie('jid', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
    });

    return res.status(200).json({
        data: { _id: user!._id },
        message: getMessage('user.valid.sign_in.success'),
        metadata: { accessToken: token },
    });
};

export default { signIn, revokeRefreshToken, refreshAccessToken };
