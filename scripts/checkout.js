import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

// loadProducts(() => {
// });