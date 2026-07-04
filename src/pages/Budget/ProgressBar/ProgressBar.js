import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledProgressBar } from './ProgressBar.styled';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { useTheme } from 'styled-components';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { progressBarColor } from './utils/progressBarColor';
import { convertDaysToDaysHoursAndMinutes } from './utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { Bar } from './Bar/Bar';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import IonIcon from '@reacticons/ionicons';
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';
export default function ProgressBar({ data, isOn, setIsOn, menu, timeZoneId, }) {
    const theme = useTheme();
    const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(data?.endDate, timeZoneId);
    const { mutate: toggleBudget } = useToggleBudget();
    return (_jsxs(StyledProgressBar, { children: [_jsxs("div", { className: "cogContainer", onClick: () => {
                    menu.value = 'manageBudgetMenu';
                }, children: [' ', _jsx(IonIcon, { name: "settings-outline", className: "cog" })] }), _jsx("div", { className: "budgetInfo", children: _jsxs("div", { className: "thisPeriod", children: [_jsx(Bar, { color: progressBarColor(data, theme), data: data }), _jsxs("div", { className: "toggleAndInfo", children: [_jsxs("div", { className: "miscInfo", children: [_jsxs("div", { className: "description", children: ["Description:\u00A0 \"", data?.description !== undefined ? data.description : '', "\""] }), dateIsInFuture(data?.startDate) ? (_jsx("div", { className: "remainingDays", children: "Not Started Yet" })) : dateIsInPast(data?.endDate) ? (_jsx("div", { className: "remainingDays", style: { color: '#FC6F6F' }, children: "Expired" })) : (_jsxs("div", { className: "remainingDays", children: ["Remaining time:", ' ', _jsxs("strong", { children: [convertedDaysHoursMinutes.days, "d", ' ', convertedDaysHoursMinutes.hours, "h", ' ', convertedDaysHoursMinutes.minutes, "m", ' '] })] })), _jsxs("div", { className: "averageSpending", children: ["Avg spent per day:\u00A0", _jsx("strong", { children: data?.currency !== undefined
                                                        ? displayCurrencyAndAmount(data.averageSpentPerDay, data.currency)
                                                        : '' })] }), _jsxs("div", { className: "scope", children: ["Scope:\u00A0", _jsx("strong", { children: getActiveScopes(data?.scope, data?.targetGroupIds).join(', ') })] })] }), _jsx(ToggleSwitch, { isOn: isOn, onToggle: () => {
                                        setIsOn(false);
                                        setTimeout(() => {
                                            toggleBudget({ budgetId: data?.id }, {
                                                onError: () => setIsOn(true),
                                            });
                                        }, 400);
                                    } })] })] }) })] }));
}
