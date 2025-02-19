import { orders } from "../../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "../utils/money.js";
import { getProduct, loadProductsFetch } from "../../data/products.js";
import { addToCart } from "../../data/cart.js";
import { renderOrdersHeader } from "./ordersHeader.js";

export function renderOrdersList() {
    let ordersSummaryHTML = '<div class="order-container">';

    orders.forEach((orderItem) => {

        const orderDateStr = dayjs(orderItem.orderTime).format('dddd D, MMMM');

        const cost = formatCurrency(orderItem.totalCostCents);

        const orderID = orderItem.id;

        ordersSummaryHTML += `
        
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDateStr}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>£${cost}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderID}</div>
                </div>
            </div>
            <div class="order-details-grid">
        `
        orderItem.products.forEach((cartItem) => {

            const productId = cartItem.productId;

            const matchingProduct = getProduct(productId);

            const deliveryDateStr =
                dayjs(cartItem.estimatedDeliveryTime).format('MMMM D');

            const quantity = cartItem.quantity;

            ordersSummaryHTML += `
            
                    <div class="product-image-container">
                        <img src="${matchingProduct.image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${deliveryDateStr}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${quantity}
                        </div>
                        <button class="buy-again-button button-primary js-buy-again"
                        data-product-id=${matchingProduct.id}
                        data-quantity=${quantity}>
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html?orderId=${orderID}&productId=${productId}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                        </a>
                    </div>
                    `;
        });

        ordersSummaryHTML += `
                </div>      
            </div>
        `
    });

    document.querySelector('.js-orders-grid')
        .innerHTML = ordersSummaryHTML;

    document.querySelectorAll('.js-buy-again').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const quantity = Number(button.dataset.quantity);
            addToCart(productId, quantity);
            renderOrdersHeader();

            button.innerHTML = 'Added';

            setTimeout(() => {
                button.innerHTML = `
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                `;
            }, 1000);
        });
    });
}

