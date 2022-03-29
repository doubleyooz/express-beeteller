import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
const whitelist = [`${process.env.CLIENT}`];

const headers = [
    'Origin',
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Accept',
    'Authorization',
    'Origin',
    'X-Requested-With',
    /*"Access-Control-Request-Method",*/ 'Access-Control-Allow-Credentials' /*"Access-Control-Request-Header"*/,
];

const corsOptionsDelegate: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
};

export default corsOptionsDelegate;
