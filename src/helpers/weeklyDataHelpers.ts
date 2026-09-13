const getMonthWeek = (year: number, week: number) => {
  let d = new Date(year, 0, 4);

  let day = d.getDay() || 7;

  d.setDate(d.getDate() - day + 1);

  d.setDate(d.getDate() + 7 * (week - 1));
  return d;
};

export const getWeekDates = (year: number, week: number) => {
  let d = getMonthWeek(year, week);
  let arr = [];
  for (var i = 0; i < 7; i++) {
    if (d.getFullYear() === year) {
      arr.push(d.toString());
    }
    d.setDate(d.getDate() + 1);
  }

  return arr;
};

export const generateAllWeeksPerYear = (year: number) => {
  const allWeeks: Date[][] = [];
  const startWeekIndex = getWeekDates(year, 0).length === 0 ? 1 : 0;
  const endWeekIndex = getWeekDates(year, 0).length === 0 ? 53 : 52;
  for (let week = startWeekIndex; week <= endWeekIndex; week++) {
    const weekDates = getWeekDates(year, week).map((date) => new Date(date));

    allWeeks.push(weekDates);
  }
  return allWeeks;
};

export function findIndexForCurrentDate(
  dateArray: Date[][],
  date: Date
): number {
  let foundIndex = -1;

  dateArray.map((subArray, index) => {
    subArray.map((subDate) => {
      if (subDate.getTime() === date.getTime()) {
        foundIndex = index;
      }
    });
  });

  return foundIndex;
}

export const weeksToDateString = (weeks: Date[][]) => {
  return weeks.map((week) => week.map((day) => day.toDateString()));
};

export const dateStringToMonthAndDay = (weeks: string[][]) => {
  return weeks.map((week) => keepMonthAndNumberOfDay(week));
};

function keepMonthAndNumberOfDay(dateArray: string[]): string[] {
  const formattedDates: string[] = [];
  dateArray.forEach((dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const formattedDate = `${month} ${day} `;
    formattedDates.push(formattedDate);
  });

  return formattedDates;
}
