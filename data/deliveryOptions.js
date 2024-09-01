import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
    id: "1",
    deliveryDays: 7,
    priceCents: 0
}, {
    id: "2",
    deliveryDays: 3,
    priceCents: 199
}, {
    id: "3",
    deliveryDays: 1,
    priceCents: 499
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
    const dayOfweek = date.format('dddd');
    if (dayOfweek === 'Saturday' || dayOfweek === 'Sunday') {
        return true;
    }
    return false;
}

export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'days');

        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }
    return deliveryDate.format('dddd D, MMMM');
}