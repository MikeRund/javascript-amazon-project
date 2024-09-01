import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

        const productId = cartItem.id;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateStr = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
        <div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">

            <div class="delivery-date">
                Delivery date: ${dateStr}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        £${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                        data-product-id=${matchingProduct.id}>
                            Update
                        </span>
                        <input type="number" min="0" max="999" class="quantity-input js-quantity-input-${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-link" 
                        data-product-id=${matchingProduct.id}>Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                
                </div>
            </div>
        </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const dateStr = calculateDeliveryDate(deliveryOption);

            const priceStr = deliveryOption.priceCents === 0
                ? 'FREE'
                : `£${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html +=
                `
                <div class="delivery-option js-delivery-option" 
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input" 
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateStr}
                        </div>
                        <div class="delivery-option-price">
                            ${priceStr}
                        </div>
                    </div>
                </div>
        `;
        });
        return html;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                renderPaymentSummary();
                renderOrderSummary();
                renderCheckoutHeader();
            });
        });

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add("is-editing-quantity");
            });
        });

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                const inputElement = document.querySelector(`.js-quantity-input-${productId}`);

                const quantity = Number(inputElement.value);
                updateQuantity(productId, quantity);

                document.querySelector(`.js-quantity-label-${productId}`)
                    .innerHTML = quantity;
                container.classList.remove("is-editing-quantity");
                renderOrderSummary();
                renderPaymentSummary();
                renderCheckoutHeader();
            });
        });

    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () => {
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
