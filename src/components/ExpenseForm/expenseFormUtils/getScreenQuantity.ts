export const getScreenQuantity = (
  type: string,
  expenseAmount: string | undefined,
  memberAmount: string | undefined,
  isCreateExpense: boolean
) => {
  const actualAmount = memberAmount ?? '';
  const total = Number(expenseAmount);
  const share = Number(memberAmount);

  if (
    type === 'Percentages' &&
    expenseAmount &&
    memberAmount &&
    !isNaN(total) &&
    total !== 0
  ) {
    return ((share / total) * 100).toFixed(1);
  }

  return type === 'Shares' && !isCreateExpense ? '' : actualAmount;
};
