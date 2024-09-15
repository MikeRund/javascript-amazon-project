import { loadProductsFetch } from "../data/products.js";
import { renderOrdersHeader } from "./orders/ordersHeader.js";
import { renderOrdersList } from "./orders/ordersList.js";

async function loadOrderPage() {
    try {
        await loadProductsFetch();
        await renderOrdersList()
        await renderOrdersHeader();
    } catch (error) {
        console.log(error)
    }
}

loadOrderPage();