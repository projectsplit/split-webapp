import { jsx as _jsx } from "react/jsx-runtime";
import OnTrackMessage from './OnTrackMessage/OnTrackMessage';
import OverspentMessage from './OverspentMessage/OverspentMessage';
import ReceivedMoreThanSpentMessage from './ReceivedMoreThanSpentMessage/ReceivedMoreThanSpentMessage';
import Recommendation from './Recommendation/Recommendation';
import SimpleOnTrackMessage from './SimpleOnTrackMessage/SimpleOnTrackMessage';
import { NoBudgetSubmittedMessage } from './NoBudgetSubmittedMessage/NoBudgetSubmittedMessage';
import { dateIsInPast } from '../../helpers/dateIsInPast';
export const BudgetInfoMessage = (theme, closeButton, data, noSubmissions, onclick, style) => {
    if (data === undefined) {
        return _jsx(NoBudgetSubmittedMessage, { noSubmissions: noSubmissions });
    }
    if (dateIsInPast(data.endDate)) {
        return (_jsx(SimpleOnTrackMessage, { endDate: data.endDate, onClick: onclick, closeButton: closeButton, style: style || {
                backgroundColor: theme?.layer2,
                borderColor: theme?.layer2,
                borderStyle: 'solid',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '6px',
                padding: '0.4rem',
            } }));
    }
    const totalAmountSpent = parseFloat(data?.totalAmountSpent);
    // Check if remainingDays, goal, and averageSpentPerDay are provided
    if (data?.remainingDays !== undefined &&
        data?.goal !== undefined &&
        data?.averageSpentPerDay !== undefined &&
        data?.frequency !== undefined) {
        const remainingDays = parseFloat(data?.remainingDays);
        const averageSpentPerDay = parseFloat(data?.averageSpentPerDay);
        const goal = parseFloat(data?.goal);
        const spendingProjection = totalAmountSpent + remainingDays * averageSpentPerDay;
        if (totalAmountSpent === 0)
            return (_jsx(SimpleOnTrackMessage, { startDate: data?.startDate, onClick: onclick, closeButton: closeButton, style: style || {
                    backgroundColor: theme?.layer2,
                    borderColor: theme?.layer2,
                    borderStyle: 'solid',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '6px',
                    padding: '0.4rem',
                } }));
        if (totalAmountSpent < 0)
            return (_jsx(ReceivedMoreThanSpentMessage, { onClick: onclick, amount: totalAmountSpent.toString(), currency: data.currency, closeButton: closeButton, budgetFrequency: data.frequency, style: style || {
                    backgroundColor: theme?.layer2,
                    borderColor: theme?.layer2,
                    borderStyle: 'solid',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '6px',
                    padding: '0.4rem',
                } }));
        if (totalAmountSpent >= goal) {
            const overspentBy = (totalAmountSpent - goal).toFixed(2);
            const offBudgetAmount = (spendingProjection - goal).toFixed(2);
            return (_jsx(OverspentMessage, { onClick: onclick, overspent: totalAmountSpent > goal, offBudgetAmount: offBudgetAmount, overspentBy: overspentBy, currency: data.currency, closeButton: closeButton, budgetFrequency: data.frequency, style: style || {
                    backgroundColor: theme?.layer2,
                    borderColor: theme?.layer2,
                    borderStyle: 'solid',
                    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: '6px',
                    padding: '0.4rem',
                } }));
        }
        else {
            const isOnTarget = spendingProjection - goal > 0 ? false : true;
            if (!isOnTarget) {
                const offBudgetBy = (spendingProjection - goal).toFixed(2);
                const reachCapInDays = ((goal - totalAmountSpent) /
                    averageSpentPerDay).toFixed(1);
                const reduceByRecommendation = (averageSpentPerDay -
                    (goal - totalAmountSpent) / remainingDays).toFixed(2);
                return (_jsx(Recommendation, { onClick: onclick, days: reachCapInDays, offBudgetAmount: offBudgetBy, reduceAmount: reduceByRecommendation, currency: data.currency, closeButton: closeButton, budgetFrequency: data.frequency, style: style || {
                        backgroundColor: theme?.layer2,
                        borderColor: theme?.layer2,
                        borderStyle: 'solid',
                        //boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: '6px',
                        padding: '0.4rem',
                    } }));
            }
            else {
                const onTargetAmount = (goal - spendingProjection).toFixed(2);
                return (_jsx(OnTrackMessage, { onClick: onclick, amount: onTargetAmount, currency: data.currency, closeButton: closeButton, budgetFrequency: data.frequency, style: style || {
                        backgroundColor: theme?.layer2,
                        borderColor: theme?.layer2,
                        borderStyle: 'solid',
                        //boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: '6px',
                        padding: '0.4rem',
                    } }));
            }
        }
    }
    else {
        return (_jsx("div", { children: _jsx("p", { children: "Some required budget data is missing. Cannot calculate projections." }) }));
    }
};
