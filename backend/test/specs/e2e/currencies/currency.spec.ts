import { currentPrice, getCurrency, latelyPrice } from '../../../helpers/currency.helper';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Currencies', () => {
    describe('should work', () => {
        latelyPrice('USD-BRL', 20);
        currentPrice();
        getCurrency('USD-BRL');
    })
  
});