export const amountIsValid = (amount, setAmountError, setShowAmountError) => {
    const numAmount = Number(amount);
    const isInvalid = !amount || numAmount <= 0;
    if (isInvalid)
        setShowAmountError(true);
    setAmountError(isInvalid ? 'Enter a valid amount greater than zero' : '');
    return !isInvalid;
};
