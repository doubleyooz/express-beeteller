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

                expect(response.body).toEqual({
                    message: getMessage('currency.lately.prices'),
                    data: expect.arrayContaining([
                        expect.objectContaining({                           
                            high:  expect.any(String),
                            low:  expect.any(String),
                            varBid:  expect.any(String),
                            timestamp:  expect.any(String),
                        }),
                    ]),
                });
            });
    });
};

export { latelyPrice };
