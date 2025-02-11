export const getOrdinalSuffix = (x: string | undefined): string => {
  if (x === undefined) return "";
  const number = parseFloat(x);
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th"; // 11th, 12th, and 13th are exceptions
  }

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
