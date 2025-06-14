// * Return first day of specified week of month of year
// **
// ** @param {number|string} year - year for required week
// ** @param {number|string} month - month for required week
// **         Month is calendar month number, 1 = Jan, 2 = Feb, etc.
// ** @param {number|string} week - week of month
// **         First week of month is the one with the first Thursday
// ** @returns {Date} date for Monday at start of required week

export const getMonthWeek = (year: number, week: number) => {
  // Set date to 4th of month
  let d = new Date(year, 0, 4);

  // Get day number, set Sunday to 7
  let day = d.getDay() || 7;

  // Set to prior Monday
  d.setDate(d.getDate() - day + 1);

  // Set to required week
  d.setDate(d.getDate() + 7 * (week - 1));
  return d;
};

// Return array of dates for specified week of year
export const getWeekDates = (year: number, week: number) => {
  let d = getMonthWeek(year, week);
  let arr = [];
  for (var i = 0; i < 7; i++) {
    // Execute the block only when i is equal to 0 or 6
    if (d.getFullYear() === year) {
      // Array of date strings
      arr.push(d.toString());
    }
    // Increment date
    d.setDate(d.getDate() + 1);
  }

  return arr;
};

export const generateAllWeeksPerYear = (year: number) => {
  const allWeeks: Date[][] = [];
  const numberOfWeeks = numberOfweeksInYear(year);
  
  // const startWeekIndex = numberOfWeeks === 53 ? 1 : 0;
  // const endWeekIndex = numberOfWeeks === 53 ? 53 : 52;
  const startWeekIndex = getWeekDates(year,0).length===0?1:0
  const endWeekIndex =getWeekDates(year,0).length===0?53:52
  for (let week = startWeekIndex; week <= endWeekIndex; week++) {
    const weekDates = getWeekDates(year, week)
      // .filter(
      //   (date, index, array) => index === 0 || index === array.length - 1 //keeps only first and last date of week
      // )
      .map((date) => new Date(date));
     
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

export function keepMonthAndNumberOfDay(dateArray: string[]): string[] {
  const formattedDates: string[] = [];
  dateArray.forEach((dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const formattedDate = `${month} ${day} `;
    formattedDates.push(formattedDate);
  });

  return formattedDates;
}

export const getWeekNumber = (d: Date): [number, number] => {
  d = new Date(+d);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  return [d.getFullYear(), weekNo];
};

export const numberOfweeksInYear = (year: number) => {
  var d = new Date(year, 11, 31);
  var week = getWeekNumber(d)[1];
  return week === 1 ? 52 : week;
};
