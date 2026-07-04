import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import SetUpSpendingGoal from '../SetUpSpendingGoal/SetUpSpendingGoal';
import SpendingCycle from '../SpendingCycle/SpendingCycle';
import { useQueryClient } from '@tanstack/react-query';
import { useSignal } from '@preact/signals-react';
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import { currencyData } from '@/helpers/openExchangeRates';
export const FirstPage = ({ menu, data, handleInputChangeCallback, actions, timeZoneId, }) => {
    const queryClient = useQueryClient();
    const spendingInfoQueryKey = [
        'spending',
        data.budgetFrequency.value,
        data.currencySymbol,
    ];
    // const { data, isFetching, isStale } = useSpendingInfo(
    //   budgetFrequency.value,
    //   currencySymbol
    // );
    const info = {
        budgetSubmitted: false,
        totalAmountSpent: '0',
        currency: 'USD',
    };
    const isFetching = false;
    const isStale = false;
    const querydata = queryClient.getQueryData(spendingInfoQueryKey);
    const allCurrencies = useSignal(currencyData);
    const selectedCurrency = allCurrencies.value.find((c) => c.symbol === data.currencySymbol);
    return (_jsxs(_Fragment, { children: [!selectedCurrency ? (_jsx("div", { style: { margin: '15px' }, children: _jsx(Shimmer, { borderRadius: "10px", height: "50px", width: "100%" }) })) : (_jsxs("div", { className: "errorsWrapper", children: [_jsx(SetUpSpendingGoal, { menu: menu, displayedAmount: data.displayedAmount, selectedCurrency: selectedCurrency, onChange: handleInputChangeCallback, "$inputError": data.errors.showAmountError && !!data.errors.amountError }), _jsx("span", { className: "errorMsg", children: data.errors.showAmountError && data.errors.amountError
                            ? data.errors.amountError
                            : '' })] })), !selectedCurrency ? (_jsx("div", { style: { margin: '15px' }, children: _jsx(Shimmer, { borderRadius: "10px", height: "50px", width: "100%" }) })) : (_jsxs("div", { className: "errorsWrapper", children: [_jsx(SpendingCycle, { calendarDay: data.calendarDay, budgetFrequency: data.budgetFrequency, menu: menu, isStale: isStale, openCalendar: data.openCalendar, openCustomDateCalendar: data.openCustomDateCalendar, hasSwitchedBudgetType: data.hasSwitchedBudgetType, timeZoneId: timeZoneId, startDate: data.startDate, endDate: data.endDate, pickingTarget: data.pickingTarget, setError: actions.setError, "$inputError": (data.errors.showSpendingCycleError &&
                            !!data.errors.spendingCycleError) ||
                            (data.errors.showCommencementDayError &&
                                !!data.errors.commencementDayError) }), _jsxs("span", { className: "errorMsg", children: [data.errors.showSpendingCycleError &&
                                data.errors.spendingCycleError
                                ? data.errors.spendingCycleError
                                : '', data.errors.showCommencementDayError &&
                                data.errors.commencementDayError
                                ? data.errors.commencementDayError
                                : ''] })] })), isFetching ? (_jsx(_Fragment, {})) : (querydata && (_jsx("div", { className: "spentInfo", children: _jsxs("div", { children: ["You have spent", ' ', displayCurrencyAndAmount(info?.totalAmountSpent, querydata?.currency), ' ', "this ", data.budgetFrequency.value === 1 ? 'month' : 'week'] }) })))] }));
};
