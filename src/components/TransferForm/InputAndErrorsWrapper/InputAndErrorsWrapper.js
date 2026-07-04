import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InputMonetary from '@/components/InputMonetary/InputMonetary';
import { StyledInputAndErrorsWrapper } from './InputAndErrorsWrapper.styled';
import { handleInputChange } from '@/helpers/handleInputChange';
import { useSignal } from '@preact/signals-react';
import { currencyData } from '@/helpers/openExchangeRates';
export const InputAndErrorsWrapper = ({ currencyMenu, displayedAmount, data, actions, handleInputBlur, }) => {
    const allCurrencies = useSignal(currencyData);
    const selectedCurrency = allCurrencies.value.find((c) => c.symbol === data.currencySymbol);
    return (_jsxs(StyledInputAndErrorsWrapper, { children: [_jsx(InputMonetary, { currencyMenu: currencyMenu, value: displayedAmount.value, onChange: (e) => {
                    handleInputChange(e, data.currencySymbol, displayedAmount, actions.setAmount);
                    actions.setError('showAmountError', false);
                    actions.setError('showSamePersonError', false);
                    actions.setError('isSameUserError', '');
                }, onBlur: handleInputBlur, selectedCurrency: selectedCurrency, autoFocus: true, "$inputError": data.errors.showAmountError && !!data.errors.amountError }), _jsx("span", { className: "errorMsg", children: data.errors.showAmountError && data.errors.amountError
                    ? data.errors.amountError
                    : '' })] }));
};
