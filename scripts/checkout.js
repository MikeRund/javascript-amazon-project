import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
    try {
        await loadProductsFetch();
    } catch (error) {
        console.log(error);
    }


    await new Promise(() => {
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
}
loadPage();
loadCartFetch();

// loadProductsFetch().then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
// });

// loadProducts(() => {
// });