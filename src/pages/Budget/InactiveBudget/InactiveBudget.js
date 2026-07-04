import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledInactiveBudget } from './InactiveBudget.styled';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { convertDaysToDaysHoursAndMinutes } from '@/pages/Budget/ProgressBar/utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { getIsoDateInfo } from '@/helpers/getIsoDateInfo';
import { useState } from 'react';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import IonIcon from '@reacticons/ionicons';
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';
export const InactiveBudget = ({ budget, onActivate, menu, timeZoneId, }) => {
    const { mutate: toggleBudget } = useToggleBudget();
    const [isOn, setIsOn] = useState(false);
    console.log(budget);
    const startDateDecomposed = getIsoDateInfo(budget?.startDate);
    const endDateDecomposed = getIsoDateInfo(budget?.endDate);
    const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(budget?.endDate, timeZoneId);
    return (_jsxs(StyledInactiveBudget, { children: [_jsxs("div", { className: "cogContainer", onClick: () => {
                    menu.value = 'manageBudgetMenu';
                }, children: [' ', _jsx(IonIcon, { name: "settings-outline", className: "cog" })] }), _jsxs("div", { className: "budgetTitle", children: [' ', "\"", budget?.description !== undefined ? budget.description : '', "\""] }), _jsxs("div", { className: "toggleAndInfo", children: [_jsxs("div", { className: "miscInfo", children: [_jsxs("div", { className: "dates", children: ["Period:\u00A0", _jsxs("strong", { children: [startDateDecomposed.dateNumber, " ", startDateDecomposed.month, " -", ' ', endDateDecomposed.dateNumber, " ", endDateDecomposed.month] })] }), dateIsInFuture(budget?.startDate) ? (_jsx("div", { className: "remainingDays", children: "Not Started Yet" })) : dateIsInPast(budget?.endDate) ? (_jsx("div", { className: "remainingDays", style: { color: '#FC6F6F' }, children: "Expired" })) : (_jsxs("div", { className: "remainingDays", children: ["Remaining time:", ' ', _jsxs("strong", { children: [convertedDaysHoursMinutes.days, "d", ' ', convertedDaysHoursMinutes.hours, "h", ' ', convertedDaysHoursMinutes.minutes, "m", ' '] })] })), _jsxs("div", { className: "averageSpending", children: ["Goal:\u00A0", _jsx("strong", { children: budget?.currency !== undefined
                                            ? displayCurrencyAndAmount(budget?.amount, budget?.currency)
                                            : '' })] }), _jsxs("div", { className: "scope", children: ["Scope:\u00A0", _jsx("strong", { children: getActiveScopes(budget?.scope, budget?.targetGroupIds).join(', ') })] })] }), _jsx(ToggleSwitch, { isOn: isOn, onToggle: () => {
                            setIsOn(true);
                            onActivate();
                            setTimeout(() => {
                                toggleBudget({ budgetId: budget?.id }, {
                                    onError: () => setIsOn(false),
                                });
                            }, 400);
                        } })] })] }));
};
