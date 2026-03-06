export const amountIsValid = (amount: string,setAmountError: (value: string) => void, setShowAmountError:(value: boolean) => void) => {
  const numAmount = Number(amount);
  const isInvalid = !amount || numAmount <= 0;
  if(isInvalid) setShowAmountError(true);
  setAmountError(isInvalid ? "Enter a valid amount greater than zero" : "");
  return !isInvalid;
};