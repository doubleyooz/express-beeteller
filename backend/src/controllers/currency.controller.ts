import { Request, Response } from 'express';
import axios from 'axios';
import { getMessage } from '../utils/message.util';

// "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";
const url = 'https://economia.awesomeapi.com.br/json/last/';
const url2 = 'https://api.kraken.com/0/public/Ticker?pair=XBTeur';
const url3 = 'https://api.kraken.com/0/public/Ticker?pair=XBTusd';


async function getCurrency(req: Request, res: Response) {
    const { currency } = req.query;

    axios
        .get(url + currency)
        .then(json => {
            return res.status(201).json(json.data);
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
}

export default { getCurrency };
