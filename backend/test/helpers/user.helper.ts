import supertest from 'supertest';

import { app } from '../../src/config/express.config';
import { getMessage } from '../../src/utils/message.util';
import { USER } from '../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);
const email = false;

const createUser = (payload: any, statusCode: number) => {
    it('POST /sign-up', async () => {
        await supertest(app)
            .post('/users')
            .send(payload)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                USER._id = response.body.data._id;
                switch (statusCode) {
                    case 200:
                        expect(response.status).toEqual(200);
                        expect(response.body).toMatchObject({
                            message: getMessage('user.valid.sign_up.success'),
                            data: { email: USER.email, _id: USER._id },
                        });
                        break;

                    case 400:
                        expect(response.status).toEqual(400);
                        expect(response.body).toMatchObject({
                            message: getMessage('default.badRequest'),
                        });
                        break;
                    default:
                        expect(1).toEqual(2);
                        break;
                }
            });
    });

    itif(statusCode == 200)('GET /sign-in', async () => {
        await supertest(app)
            .get('/sign-in')
            .auth(payload.email, payload.password)
            .expect(statusCode)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();
                USER.token = response.body.metadata.token;

                expect(response.body).toMatchObject({
                    data: { _id: USER._id },
                    message: getMessage('user.valid.sign_in.success'),
                    metadata: {},
                });
            });
    });
};

const findOne = (statusCode: number, _id?: string) => {
    it('GET /users/findOne', async () => {
        await supertest(app)
            .get(`/users/findOne?_id=${_id ? _id : USER._id}`)
            .set('Authorization', 'Bearer ' + USER.token)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                switch (statusCode) {
                    case 200:
                        expect(response.status).toEqual(200);
                        USER._id = response.body.data._id;
                        expect(response.body).toMatchObject({
                            message: getMessage('user.findOne.success'),
                            data: { email: USER.email, _id: USER._id },
                        });
                        break;

                    case 400:
                        expect(response.status).toEqual(400);
                        expect(response.body).toMatchObject({
                            message: getMessage('default.badRequest'),
                        });
                        break;
                    case 404:
                        expect(response.status).toEqual(404);
                        expect(response.body).toMatchObject({
                            message: getMessage('user.notfound'),
                        });
                        break;
                    default:
                        expect(1).toEqual(2);
                        break;
                }
            });
    });
};

const remove = (statusCode: number, _id?: string) => {
    it('DELETE /users', async () => {
        await supertest(app)
            .delete(`/users?_id=${_id ? _id : USER._id}`)
            .set('Authorization', 'Bearer ' + USER.token)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                switch (statusCode) {
                    case 200:
                        expect(response.status).toEqual(200);
                        expect(response.body).toMatchObject({
                            message: getMessage('user.delete.success'),
                        });
                        break;

                    case 400:
                        expect(response.status).toEqual(400);
                        expect(response.body).toMatchObject({
                            message: getMessage('default.badRequest'),
                        });
                        break;

                    case 404:
                        expect(response.status).toEqual(404);
                        expect(response.body).toMatchObject({
                            message: getMessage('user.notfound'),
                        });
                        break;
                    default:
                        expect(1).toEqual(2);
                        break;
                }
            });
    });

    it('GET /users/findOne', async () => {
        await supertest(app)
            .get(`/users/findOne?_id=${_id ? _id : USER._id}`)
            .set('Authorization', 'Bearer ' + USER.token)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();
                if (_id) {
                    switch (statusCode) {
                        case 404:
                            expect(response.status).toEqual(404);
                            expect(response.body).toMatchObject({
                                message: getMessage('user.notfound'),
                            });
                            break;

                        case 400:
                            expect(response.status).toEqual(400);
                            expect(response.body).toMatchObject({
                                message: getMessage('default.badRequest'),
                            });
                            break;

                        case 200:
                            expect(response.status).toEqual(404);
                            expect(response.body).toMatchObject({
                                message: getMessage('user.notfound'),
                            });
                            break;
                        default:
                            expect(1).toEqual(2);
                            break;
                    }
                } else {
                    switch (statusCode) {
                        case 404:
                            expect(response.status).toEqual(200);
                            expect(response.body).toMatchObject({
                                message: getMessage('user.findOne.success'),
                            });
                            break;

                        case 400:
                            expect(response.status).toEqual(200);
                            expect(response.body).toMatchObject({
                                message: getMessage('user.findOne.success'),
                            });
                            break;

                        case 200:
                            expect(response.status).toEqual(404);
                            expect(response.body).toMatchObject({
                                message: getMessage('user.notfound'),
                            });
                            break;
                        default:
                            expect(1).toEqual(2);
                            break;
                    }
                }
            });
    });
};

const schema = (payload: { _id: string; name: string; email: string }) => {
    return {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
    };
};

const sign_in = (payload: { _id: string; tokenVersion: number }) => {
    return {
        tokenVersion: payload.tokenVersion,
        _id: payload._id,
    };
};

export { createUser, findOne, remove, schema };
