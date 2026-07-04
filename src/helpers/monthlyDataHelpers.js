export const getAllDaysInMonth = (month, year) => Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => new Date(year, month - 1, i + 1));
export const getNameForCurrentMonth = (year, monthIndex, date) => {
    const currDate = new Date(year, monthIndex, date);
    const dateOptions = { month: 'long' };
    return currDate.toLocaleDateString('en-US', dateOptions);
};
export const monthMap = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
};
export function convertToFullMonthNames(arrayOfWeeks) {
    return arrayOfWeeks.map((week) => {
        return week.map((date) => {
            const [abbreviatedMonth, day] = date.split(' ');
            const fullMonth = monthMap[abbreviatedMonth];
            return `${fullMonth} ${day}`;
        });
    });
}
