export const amountIsValid = (amount: string) => {
  const numAmount = Number(amount);
  const isInvalid = !amount || numAmount <= 0;
  return !isInvalid;
};
