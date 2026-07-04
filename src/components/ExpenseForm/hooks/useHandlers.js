import { amountIsValid } from '@/helpers/amountIsValid';
import { handleInputChange } from '@/helpers/handleInputChange';
import { useCallback } from 'react';
export const useHandlers = (participants, payers, setShowAmountError, amount, setAmountError, setCurrencySymbol, currencyMenu, displayedAmount, setAmount, setParticipantsError, setPayersError, isInitialRender, validateForm, isCreateExpense, setDescription, setDescriptionError, currencySymbol) => {
    const handleInputBlur = useCallback(() => {
        if (participants.some((p) => p.selected) ||
            payers.some((p) => p.selected)) {
            setShowAmountError(true);
            amountIsValid(amount, setAmountError, setShowAmountError);
        }
    }, [participants, payers, amount, setAmountError]);
    const handleCurrencyOptionsClick = useCallback((curr) => {
        setCurrencySymbol(curr);
        currencyMenu.value = null;
        displayedAmount.value = '';
    }, [currencyMenu]);
    const handleInputChangeCallback = useCallback((e) => {
        handleInputChange(e, currencySymbol, displayedAmount, setAmount);
        setShowAmountError(false);
        setAmountError('');
        setParticipantsError('');
        setPayersError('');
        if (!isInitialRender.current)
            validateForm({ showErrors: true });
    }, [currencySymbol, displayedAmount, setAmount]);
    const handleDescriptionChange = useCallback((e) => {
        setDescription(e.target.value);
        if (!isCreateExpense)
            return;
        setDescriptionError('');
    }, []);
    return {
        handleInputBlur,
        handleCurrencyOptionsClick,
        handleInputChangeCallback,
        handleDescriptionChange,
    };
};
