export function generateMonthDaysArray(daysArray) {
    const weeks = [];
    let week = [];
    daysArray.forEach((day, index) => {
        week.push(day);
        if ((index + 1) % 7 === 0 || index === daysArray.length - 1) {
            weeks.push(week);
            week = [];
        }
    });
    if (weeks.length && weeks[weeks.length - 1].length < 7) {
        while (weeks[weeks.length - 1].length < 7) {
            weeks[weeks.length - 1].push('');
        }
    }
    return weeks;
}
