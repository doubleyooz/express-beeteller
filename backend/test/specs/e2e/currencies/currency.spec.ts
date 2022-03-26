import { signIn } from '../../../helpers/auth.helper';
import {
    currentPrice,
    getCurrency,
    latelyPrice,
} from '../../../helpers/currency.helper';
import { createUser } from '../../../helpers/user.helper';
import { TOKEN } from '../../../mocks/jwt.mock';
import { USER } from '../../../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Currencies', () => {
    createUser({ email: USER.email, password: USER.password }, 200);
    signIn(USER.email, USER.password, 200);

    describe('should work', () => {
        latelyPrice('USD-BRL', 30, 200);
        currentPrice(200);
        getCurrency('USD-BRL', 200);
    });

    describe('should reject', () => {
        latelyPrice('USD-BRL', 20, 400);
        latelyPrice('USDD-BRL', 30, 400);
        getCurrency('USSD-BRL', 400);       
    });
});
