import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import corsOptionsDelegate from './cors.config';

import appRoute from '../routes/app.route';
import authRoute from '../routes/auth.route';
import userRoute from '../routes/user.route';
import currencyRoute from '../routes/currency.route';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.set('trust proxy', 1);
//app.use(cors());
app.use(
    cors({
        origin: `${process.env.CLIENT}`,
        credentials: true,
    }),
);

app.use(appRoute);
app.use(authRoute);
app.use(userRoute);
app.use(currencyRoute);

export { app };
