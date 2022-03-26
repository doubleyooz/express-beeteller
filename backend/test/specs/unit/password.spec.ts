import { hashPassword, matchPassword } from '../../../src/utils/password.util';
import { USER } from '../../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Password', () => {
    describe('should work', () => {
        it('GET /sign-in', async () => {
            const hash = await hashPassword(USER.password);

            expect(await matchPassword(hash, USER.password)).toBe(true);
        });
    });
});
