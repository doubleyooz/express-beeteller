import { randomUUID } from 'crypto';

export const USER = {
    email: `${process.env.TEST_EMAIL}`,
    password: `asd232S@#1`,
    _id: randomUUID(),
    token: '',
};

export const FAKE_USER = {
    email: `2.com5@d`,
    password: `asdasd`,
    _id: randomUUID(),
    token: '',
};
