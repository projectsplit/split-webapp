export const getLocaleFromCurrency = (currencyCode: string): string => {
  const currencyLocaleMap: { [key: string]: string } = {
    USD: 'en-US',
    PLN: 'pl-PL',
  };

  const locale = currencyLocaleMap[currencyCode];
  return locale || 'en-US';
};
