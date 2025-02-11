export const removeCommas = (inputString: string): string => {
  const cleanString = inputString.replace(/,/g, "");
  return cleanString;
};
