import { USER, FAKE_USER } from '../../../mocks/user.mock';
import { signIn } from '../../../helpers/auth.helper';
import { createUser, findOne } from '../../../helpers/user.helper';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Users', () => {   
    describe('should accept', () => {
        createUser({ email: USER.email, password: USER.password }, 200);
        signIn(USER.email, USER.password, 200);
        findOne(1, 200);
    });

    describe('should reject', () => {
        createUser({ email: FAKE_USER.email, password: USER.password }, 400);
    });
});
