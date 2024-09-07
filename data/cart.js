import { deliveryOptions } from "./deliveryOptions.js";

export let cart;
loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart =
            [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: "1"
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: "2"
            }];
    }
}

export function addToCart(productId, quantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
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

    cart.forEach((cartItem) => {
        if (productId === cartItem.id) {
            matchingItem = cartItem;
        }
    });

    if (!matchingItem) {
        return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}