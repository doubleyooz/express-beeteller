import { USER, FAKE_USER, USER_2 } from '../../../mocks/user.mock';
import { signIn } from '../../../helpers/auth.helper';
import { createUser, findOne, remove } from '../../../helpers/user.helper';
import mongoose from 'mongoose';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Users', () => {
    describe('should accept', () => {
        createUser({ email: USER.email, password: USER.password, n: 1 }, 200);
        createUser(
            { email: USER_2.email, password: USER_2.password, n: 2 },
            200,
        );
        signIn(USER.email, USER.password, 200);
        findOne(200);
        remove(200);
    });

    describe('should reject', () => {
        createUser({ email: FAKE_USER.email, password: USER.password }, 400);
        findOne(404, new mongoose.Types.ObjectId().toString());
        findOne(400, 'adsa');
        remove(401, new mongoose.Types.ObjectId().toString());
        remove(400, 'dasdas');
    });
});
