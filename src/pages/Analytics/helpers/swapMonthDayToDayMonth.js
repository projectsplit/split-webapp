export function swapMonthDayToDayMonth(dateArray) {
    return dateArray.map((dateString) => {
        const [month, day] = dateString.split(' ');
        return `${day} ${month}`;
    });
}
