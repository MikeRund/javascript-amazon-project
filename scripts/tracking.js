import { getDeliveryDate, getOrder, getQuantity } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function renderTrackingPage() {
    const url = new URL(window.location.href);
    const orderID = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const matchingProduct = getProduct(productId);

    const matchingOrder = getOrder(orderID);

    const deliveryDate = getDeliveryDate(matchingOrder, productId);

    const dateStr = dayjs(deliveryDate).format('dddd, MMMM D');

    const quantity = getQuantity(matchingOrder, productId);

    console.log(quantity);

    let trackingHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${dateStr}
            </div>

            <div class="product-info">
                ${matchingProduct.name}
            </div>

            <div class="product-info">
                Quantity: ${quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            <div class="progress-labels-container">
                <div class="progress-label">
                Preparing
                </div>
                <div class="progress-label current-status">
                Shipped
                </div>
                <div class="progress-label">
                Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;


}

async function loadPage() {
    await loadProductsFetch();
    renderTrackingPage();
}
loadPage();