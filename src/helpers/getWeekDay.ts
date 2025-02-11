export const getWeekday = (x: string | undefined | null): string => {
  if (x === undefined || x === null) return "";
  const dayNumber = parseFloat(x);
  switch (dayNumber) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      throw new Error("Invalid day number. Must be between 1 and 7.");
  }
};
