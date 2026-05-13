export const submitBudgetFn = (
  validateForm: () => {
    isValid: boolean;
    errors: {
      amountError: string;
      descriptionError: string;
      spendingCycleError: string;
      scopeError: string;
      commencementDayError: string;
    };
  }
) => {
  const { isValid, errors: validationErrors } = validateForm();
  return { isValid, errors: validationErrors };
};
