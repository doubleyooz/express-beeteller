import supertest from 'supertest';

import { app } from '../../src/config/express.config';
import { getMessage } from '../../src/utils/message.util';

const itif = (condition: boolean) => (condition ? it : it.skip);

const latelyPrice = (currency: string, days: number) => {
    it('GET /currencies/lately', async () => {
        await supertest(app)
            .get(`/currencies/lately?currency=${currency}&days=${days}`)
            .expect(201)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                expect(response.body.data.length === days).toBeTruthy();
                console.log(response.body.data);
                expect(response.body).toEqual({
                    message: getMessage('currency.lately.prices'),
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            high: expect.any(Number),
                            low: expect.any(Number),
                            pctChange: expect.any(String),
                            timestamp: expect.any(String),
                        }),
                    ]),
                });
            });
    });
};

const currentPrice = () => {
    it('GET /currencies/now', async () => {
        await supertest(app)
            .get(`/currencies/now`)
            .expect(201)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                expect(response.body.data.length === 3).toBeTruthy();
                
                expect(response.body).toEqual({
                    message: getMessage('currency.current.prices'),
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            name: 'USD/BRL',
                            code: 'USD',
                            codein: 'BRL',
                            bid: expect.any(String),
                        }),
                        expect.objectContaining({
                            name: 'BTC/EUR',
                            code: 'BTC',
                            codein: 'EUR',
                            bid: expect.any(String),
                        }),
                        expect.objectContaining({
                            name: 'BTC/USD',
                            code: 'BTC',
                            codein: 'USD',
                            bid: expect.any(String),
                        }),
                    ]),
                });
            });
    });
};

const getCurrency = (currency: string) => {
    it('GET /currencies', async () => {
        await supertest(app)
            .get(`/currencies?currency=${currency}`)
            .expect(201)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                console.log(response.body.data);
                expect(response.body).toEqual({
                    message: getMessage('currency.get.price'),
                    data: expect.objectContaining({
                        [currency.replace('-', '')]: {
                            ask: expect.any(String),
                            bid: expect.any(String),
                            code: 'USD',
                            codein: 'BRL',
                            create_date: expect.any(String),
                            high: expect.any(String),
                            low: expect.any(String),
                            name: expect.any(String),
                            pctChange: expect.any(String),
                            timestamp: expect.any(String),
                            varBid: expect.any(String),
                        },
                    }),
                });
            });
    });
};

export { latelyPrice, currentPrice, getCurrency };
