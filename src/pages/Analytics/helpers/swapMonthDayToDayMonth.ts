export function swapMonthDayToDayMonth(dateArray: string[]): string[] {
    return dateArray.map((dateString) => {
      const [month, day] = dateString.split(' ');
      return `${day} ${month}`;
    });
  }