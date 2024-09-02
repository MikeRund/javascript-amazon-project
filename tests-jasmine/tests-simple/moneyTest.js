import { formatCurrency } from "../../scripts/utils/money.js";

function formatCurrencyTest(name, input, expected) {
    if (formatCurrency(input) === expected) {
        console.log(`${name}: passed`);
    } else {
        console.log(`${name}: failed`);
    }
}
console.log('test suit: format currency');
formatCurrencyTest('converts pennies to pounds', 2095, '20.95');
formatCurrencyTest('works with 0', 0, '0.00');
formatCurrencyTest('rounds up', 2000.5, '20.01');
formatCurrencyTest('rounds down', 2000.4, '20.00');
