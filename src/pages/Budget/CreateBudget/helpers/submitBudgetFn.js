export const submitBudgetFn = (validateForm) => {
    const { isValid, errors: validationErrors } = validateForm();
    return { isValid, errors: validationErrors };
};
