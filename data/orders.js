export const orders = JSON.parse(localStorage.getItem('orders')) || [
    {
        "id": "0e3713e6-209f-4bef-a3e2-ca267ad830ea",
        "orderTime": "2024-09-14T20:57:02.235Z",
        "totalCostCents": 5800,
        "products": [
            {
                "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                "quantity": 2,
                "estimatedDeliveryTime": "2024-09-20T20:57:02.235Z"
            },
            {
                "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                "quantity": 1,
                "estimatedDeliveryTime": "2024-09-20T20:57:02.235Z"
            }
        ]
    }];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
    let matchingOrder;

    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });
    return matchingOrder;
}

export function getDeliveryDate(order, productId) {
    let deliveryDate;

    order.products.forEach((product) => {
        if (product.productId === productId) {
            deliveryDate = product.estimatedDeliveryTime;
        }
    });
    return deliveryDate;
}

export function getQuantity(order, productId) {
    let quantity;

    order.products.forEach((product) => {
        if (product.productId === productId) {
            quantity = product.quantity;
        }
    })
    return quantity;
}