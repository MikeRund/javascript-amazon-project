import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// 15a
const today = dayjs();
const fiveDays = today.add(5, 'day').format('MMMM D');
console.log(fiveDays);

// 15b 
const oneMonth = today.add(1, 'month').format('MMMM D');
console.log(oneMonth);

//15c
const oneMonthBefore = today.subtract(1, 'month').format('MMMM D');
console.log(oneMonthBefore);

//15d
const day = today.format('dddd');
console.log(day);

//15e
function isWeekend(date) {
    const dayOfweek = date.format('dddd');
    if (dayOfweek === 'Saturday' || dayOfweek === 'Sunday') {
        return true;
    }
    return false;
}
console.log(isWeekend(today.add(7, 'day')));