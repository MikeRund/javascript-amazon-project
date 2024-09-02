import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        // Mock local storage setItem
        spyOn(localStorage, 'setItem');
    })

    it('adds a new product to the cart', () => {

        // Mock local storage getItem
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: "1"
            }
        ]));
    });

    it('adds an existing product to the cart', () => {

        // Mock local storage getItem
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: "1"
            }]);
        });
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 2,
                deliveryOptionId: "1"
            }
        ]));
    });
});

describe('test suite: removeFromCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        // Mock local storage setItem
        spyOn(localStorage, 'setItem');

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
    });

    it('remove productId in cart', () => {
        removeFromCart(productId1);

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual(productId2);
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                id: productId2,
                quantity: 1,
                deliveryOptionId: "2"
            }
        ]));
    });

    it('remove productId not in cart', () => {
        removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual(productId1);
        expect(cart[1].id).toEqual(productId2);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[1].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                id: productId1,
                quantity: 2,
                deliveryOptionId: "1"
            }, {
                id: productId2,
                quantity: 1,
                deliveryOptionId: "2"
            }
        ]));
    });
});

describe('test suite: updateDeliveryOption', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        // Mock local storage setItem
        spyOn(localStorage, 'setItem');

        // Mock local storage getItem
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: productId1,
                quantity: 2,
                deliveryOptionId: "1"
            }]);
        });
        loadFromStorage();
    });

    it('updates delivery option with product in cart', () => {
        updateDeliveryOption(productId1, '3');

        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].id).toEqual(productId1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                id: productId1,
                quantity: 2,
                deliveryOptionId: "3"
            }
        ]));
    });

    it('does nothing if product is not in cartItem', () => {
        updateDeliveryOption(productId2, '3');

        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].id).toEqual(productId1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('does nothing is deliveryOptionId is not valid id', () => {
        updateDeliveryOption(productId1, '4');

        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].id).toEqual(productId1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});