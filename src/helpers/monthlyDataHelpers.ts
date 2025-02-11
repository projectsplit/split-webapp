export const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

export const getNameForCurrentMonth = (
  year: number,
  monthIndex: number,
  date?: number | undefined
) => {
  const currDate = new Date(year, monthIndex, date);
  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };
  return currDate.toLocaleDateString("en-US", dateOptions);
};

export const monthMap: { [key: string]: string } = {
  'Jan': 'January',
  'Feb': 'February',
  'Mar': 'March',
  'Apr': 'April',
  'May': 'May',
  'Jun': 'June',
  'Jul': 'July',
  'Aug': 'August',
  'Sept': 'September',
  'Oct': 'October',
  'Nov': 'November',
  'Dec': 'December'
};

export function convertToFullMonthNames(arrayOfWeeks: string[][]): string[][] {
  return arrayOfWeeks.map((week) => {
    return week.map((date) => {
      const [abbreviatedMonth, day] = date.split(' ');
      const fullMonth = monthMap[abbreviatedMonth];
      return `${fullMonth} ${day}`;
    });
  });
}
