import { deliveryOptions } from "./deliveryOptions.js";

function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems =
                    [{
                        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 2,
                        deliveryOptionId: "1"
                    }, {
                        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity: 1,
                        deliveryOptionId: "2"
                    }];
            }
        },

        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId, quantity) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.id) {
                    matchingItem = cartItem;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                this.cartItems.push({
                    id: productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }
            this.saveToStorage();
        },

        removeFromCart(productId) {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.id !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },

        calculateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((item) => {
                cartQuantity += item.quantity;
            });
            return cartQuantity;
        },

        updateQuantity(productId, newQuantity) {
            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.id) {
                    cartItem.quantity = newQuantity;
                }
            });
            this.saveToStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;

            let idExists = false;
            deliveryOptions.forEach((option) => {
                if (deliveryOptionId === option.id) {
                    idExists = true;
                }
            });

            if (!idExists) {
                return;
            }

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.id) {
                    matchingItem = cartItem;
                }
            });

            if (!matchingItem) {
                return;
            }
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }

    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

