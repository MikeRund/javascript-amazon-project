import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        // Mock local storage setItem
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            <div class="js-checkout-header"></div>
        `;

        // Mock local storage getItem
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: productId1,
                quantity: 2,
                deliveryOptionId: "1"
            }, {
                id: productId2,
                quantity: 1,
                deliveryOptionId: "2"
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        // Remove test html 
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerText
        ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");

        expect(
            document.querySelector(`.js-product-name-${productId2}`).innerText
        ).toEqual("Intermediate Size Basketball");

        expect(
            document.querySelector(`.js-product-price-${productId1}`).innerText
        ).toEqual('£10.90');

        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText
        ).toEqual('£20.95');
    });

    it('removes product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(
            document.querySelector(`.js-product-name-${productId2}`).innerText
        ).toEqual("Intermediate Size Basketball");

        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText
        ).toEqual('£20.95');

        expect(cart.length).toEqual(1);

        expect(cart[0].id).toEqual(productId2);
    });

    it('updates delivery option in summary', () => {
        document.querySelector(`.js-delivery-option-${3}-${productId1}`).click();

        expect(
            document.querySelector(`.js-delivery-option-input-${3}-${productId1}`).checked
        ).toBe(true);

        expect(cart.length).toEqual(2);

        expect(cart[0].id).toEqual(productId1);

        expect(cart[0].deliveryOptionId).toEqual('3');

        expect(
            document.querySelector('.js-payment-summary-shipping').innerHTML
        ).toContain('£6.98');

        expect(
            document.querySelector('.js-payment-summary-total').innerHTML
        ).toContain('£54.70');

    })
});