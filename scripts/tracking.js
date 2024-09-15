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

    // For progress bar
    const today = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);
    const deliveryTime = dayjs(deliveryDate);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

    console.log(matchingOrder);

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
                <div class="progress-label 
                ${percentProgress < 50 ? 'current-status' : ''}">
                Preparing
                </div>
                <div class="progress-label 
                 ${percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">
                Shipped
                </div>
                <div class="progress-label
                 ${percentProgress === 100 ? 'current-status' : ''}">
                Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentProgress}%;"></div>
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