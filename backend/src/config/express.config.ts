import express from 'express';

import appRoute from '../routes/app.route';
import userRoute from '../routes/user.route';
import currencyRoute from '../routes/currency.route';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRoute);
app.use(userRoute);
app.use(currencyRoute);

export { app };
