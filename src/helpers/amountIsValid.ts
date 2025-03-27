export const amountIsValid = (amount: string,setAmountError: (value: React.SetStateAction<string>) => void) => {
  const numAmount = Number(amount);
  const isInvalid = !amount || numAmount <= 0;
  setAmountError(isInvalid ? "Enter a valid amount greater than zero" : "");
  return !isInvalid;
};
