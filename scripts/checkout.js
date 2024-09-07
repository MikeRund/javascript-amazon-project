import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

async function loadPage() {
    console.log('load page');

    await loadProductsFetch()

    await new Promise(() => {
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
}
loadPage().then((value) => {
    console.log('next steps');
    console.log(value);
});

// loadProductsFetch().then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
// });

// loadProducts(() => {
// });