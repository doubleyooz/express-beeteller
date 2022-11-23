import { hashPassword, matchPassword } from '../../../src/utils/password.util';
import { FAKE_USER, USER } from '../../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Password', () => {
    describe('should work', () => {
        it('match hash with the origin string', async () => {
            const hash = await hashPassword(USER.password);

            expect(await matchPassword(hash, USER.password)).toBe(true);
        });

        it('match hash with the origin string with custom salts', async () => {
            const hash = await hashPassword(USER.password, 12);
            expect(await matchPassword(hash, USER.password)).toBe(true);
        });
    });

    describe('should fail', () => {
        it('match hash with the wrong string', async () => {
            const hash = await hashPassword(USER.password);
            expect(await matchPassword(hash, FAKE_USER.password)).toBe(false);
        });
    });
});
