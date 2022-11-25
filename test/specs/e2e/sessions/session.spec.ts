import { USER, FAKE_USER } from '../../../mocks/user.mock';
import { signIn } from '../../../helpers/auth.helper';
import { createUser } from '../../../helpers/user.helper';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Sessions', () => {
    console.log(USER);
    createUser({ email: USER.email, password: USER.password, n: 1 }, 200);
    describe('should accept', () => {
        signIn(USER.email, USER.password, 200);
    });

    describe('should reject', () => {
        signIn(FAKE_USER.email, USER.password, 401);
        signIn(USER.email, FAKE_USER.password, 401);
        signIn(FAKE_USER.email, FAKE_USER.password, 401);
    });
});
