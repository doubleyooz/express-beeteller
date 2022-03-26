import supertest from 'supertest';

import { app } from '../../src/config/express.config';
import { getMessage } from '../../src/utils/message.util';
import { USER } from '../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);

const signIn = (email: string, password: string, statusCode: number) => {
    it('GET /sign-in', async () => {
        await supertest(app)
            .get(`/sign-in`)
            .auth(email, password)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                //console.log(response.body.data);
                switch(statusCode) {
                    case 200:                        
                        expect(response.status).toEqual(200);
                        expect(response.body).toEqual({
                            message: getMessage('user.valid.sign_in.success'),
                            data: { _id: USER._id },
                            metadata: expect.objectContaining({
                                accessToken: expect.any(String),
                                refreshToken: expect.any(String),
                            }),
                        });
                        USER.token = response.body.metadata.accessToken;
                        break;
                    case 401: 
                        expect(response.status).toEqual(401);
                        expect(response.body).toEqual({
                            message: getMessage('default.unauthorized'),
                        });
                        break;
                    default:
                        expect(1).toEqual(2);
                        break;
                }
                     
              
            });
    });
};

export { signIn };
