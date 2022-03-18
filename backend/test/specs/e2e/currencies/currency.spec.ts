import { latelyPrice } from '../../../helpers/currency.helper';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Currencies', () => {
   
    latelyPrice('USD-BRL', 20);

});