import { Request, Response } from 'express';
import axios from 'axios';
import { getMessage } from '../utils/message.util';
import { date } from 'yup';

// "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";
const url = 'https://economia.awesomeapi.com.br/json/';
const url2 = 'https://api.kraken.com/0/public/Ticker?pair=XBTeur';
const url3 = 'https://api.kraken.com/0/public/Ticker?pair=XBTusd';

async function latelyPrice(req: Request, res: Response) {
    const { currency, days } = req.query;
    interface chewed {
        high: string;
        low: string;
        varBid: string;
        timestamp: string;
    }
   
    const chew: {
        (high: string, low: string, varBid: string, timestamp: string): chewed;
    } = (high, low, varBid, timestamp) => {
        return {
            high: high,
            low: low,
            varBid: varBid,
            timestamp: new Intl.DateTimeFormat('pt-BR').format(new Date(parseInt(timestamp) * 1e3)),
        };
    };

    axios
        .get(url + 'daily/' + currency + '/' + days)
        .then(json => {
           
            let arr = json.data.map((item: chewed) => {
                return chew(item.high, item.low, item.varBid, item.timestamp);
            });

            return res.status(201).json(arr);
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
}

async function currentPrice(req: Request, res: Response) {
    axios
        .all([axios.get(url + 'USD-BRL'), axios.get(url2), axios.get(url3)])
        .then(
            axios.spread((...responses) => {
                const response1 = responses[0].data[0];
                const response2 = responses[1].data.result;
                const response3 = responses[2].data.result;

                interface chewed {
                    [key: string]: {
                        code: string;
                        codein: string;
                        bid: string;
                    };
                }
                const chew: {
                    (
                        name: string,
                        code: string,
                        codein: string,
                        bid: string,
                    ): chewed;
                } = (name, code, codein, bid) => {
                    return {
                        [name]: {
                            code: code,
                            codein: codein,
                            bid: bid,
                        },
                    };
                };

                let arr: any[] = [];

                arr.push(
                    chew(
                        'USDBRL',
                        response1.code,
                        response1.codein,
                        response1.bid,
                    ),
                );
                arr.push(chew('BTCEUR', 'BTC', 'EUR', response2.XXBTZEUR.a[0]));
                arr.push(chew('USDBRL', 'BTC', 'USD', response3.XXBTZUSD.a[0]));

                return res.status(201).json(arr);
            }),
        )
        .catch(err => {
            console.log(err);
            return res.status(400).json({ error: err });
        });
}

async function getCurrency(req: Request, res: Response) {
    const { currency } = req.query;

    axios
        .get(url + 'last/' + currency)
        .then(json => {
            return res.status(201).json(json.data);
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
}

export default { getCurrency, currentPrice, latelyPrice };
