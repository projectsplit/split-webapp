import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { StyledMemberFC } from './MemberFC.styled';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { RenderBoth, RenderOwedOnly, RenderOwesOnly, RenderSettled, } from './RenderScenarios/RenderScenarios';
import SettleUpButton from './SettleUpButton/SettleUpButton';
import { joinAmounts } from '../../../helpers/joinAmounts';
import { Mode, } from '@/types';
import { useOutletContext } from 'react-router-dom';
export default function MemberFC({ pendingTransactions: propPendingTransactions, groupedTransactions, id, name, isLogedUser, isGuest, menu, idSelectedToSettleUp, participants, totalSpent, group, guestToBeReplaced, userOrMemberId, }) {
    const { mode } = useOutletContext();
    const totalsSpent = totalSpent[id] || {};
    const removeZeroesValuesFromTotalSpent = Object.fromEntries(Object.entries(totalsSpent).filter(([_, amount]) => amount !== 0));
    const showSettleUpButtonFn = (group) => {
        if (group) {
            return ((isGuest || isLogedUser) &&
                propPendingTransactions.length > 0 &&
                !group.isArchived);
        }
        else
            return isLogedUser && propPendingTransactions.length > 0;
    };
    const showSettleUpButton = showSettleUpButtonFn(group);
    const { memberTransactions, pendingTransactions, doNotShowTreeWhenMemberOwes, doNotShowTreeWhenMemberIsOwed, memberIsOwed, memberOwes, memberIsOwedItems, memberOwesItems, } = useMemo(() => {
        const memberTransactions = groupedTransactions.filter((gt) => gt.id === id);
        const pendingTransactions = propPendingTransactions.filter((p) => p.debtor === id || p.creditor === id);
        const timesMemberIsOwed = pendingTransactions.filter((tx) => tx.creditor === id).length;
        const timesMemberOwes = pendingTransactions.filter((tx) => tx.debtor === id).length;
        const memberIsOwed = pendingTransactions.some((x) => x.creditor === id);
        const memberOwes = pendingTransactions.some((x) => x.debtor === id);
        const memberOwesItems = pendingTransactions
            .filter((p) => p.debtor === id)
            .map((p, index) => (_jsxs("div", { children: [_jsx("span", { className: "currencyOwes", children: displayCurrencyAndAmount(p.amount.toString(), p.currency) }), ' ', _jsx("span", { className: "preposition", children: "to" }), ' ', _jsx("strong", { children: getParticipantName(p, participants, userOrMemberId, 'to') })] }, index)));
        const memberIsOwedItems = pendingTransactions
            .filter((p) => p.creditor === id)
            .map((p, index) => (_jsxs("div", { children: [_jsx("span", { className: "currencyIsOwed", children: displayCurrencyAndAmount(p.amount.toString(), p.currency) }), ' ', _jsx("span", { className: "preposition", children: "from" }), ' ', _jsx("strong", { children: getParticipantName(p, participants, userOrMemberId, 'from') })] }, index)));
        let doNotShowTreeWhenMemberIsOwed = timesMemberIsOwed === 1;
        let doNotShowTreeWhenMemberOwes = timesMemberOwes === 1;
        return {
            memberTransactions,
            pendingTransactions,
            doNotShowTreeWhenMemberOwes,
            doNotShowTreeWhenMemberIsOwed,
            memberIsOwed,
            memberOwes,
            memberIsOwedItems,
            memberOwesItems,
        };
    }, [
        groupedTransactions,
        id,
        propPendingTransactions,
        participants,
        userOrMemberId,
    ]);
    function getParticipantName(p, participants, userOrMemberId, direction) {
        const targetId = direction === 'to' ? p.creditor : p.debtor;
        if (targetId === userOrMemberId)
            return 'You';
        return (participants.find((m) => m.id === targetId)?.name ||
            (direction === 'to' ? p.creditorName : p.debtorName) ||
            'Unknown');
    }
    return (_jsxs(StyledMemberFC, { isGuest: isGuest, isLogedUser: isLogedUser, children: [_jsxs("div", { className: "debtsCreditsStripeAndTotal", children: [_jsxs("div", { className: "debtsCreditsAndTree", children: [_jsx("div", { className: "debtsCredits", children: (() => {
                                    if (memberIsOwed && !memberOwes) {
                                        return (_jsx(RenderOwedOnly, { showTree: !doNotShowTreeWhenMemberIsOwed, memberTransactions: memberTransactions, isLogedUser: isLogedUser, id: id, name: name, pendingTransactions: pendingTransactions, treeItems: memberIsOwedItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }));
                                    }
                                    if (!memberIsOwed && !memberOwes) {
                                        return _jsx(RenderSettled, { isLogedUser: isLogedUser, name: name });
                                    }
                                    if (memberOwes && !memberIsOwed) {
                                        return (_jsx(RenderOwesOnly, { showTree: !doNotShowTreeWhenMemberOwes, memberTransactions: memberTransactions, isLogedUser: isLogedUser, id: id, name: name, pendingTransactions: pendingTransactions, treeItems: memberOwesItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }));
                                    }
                                    if (memberIsOwed && memberOwes) {
                                        return (_jsx(RenderBoth, { doNotshowTreeWhenMemberIsOwed: doNotShowTreeWhenMemberIsOwed, doNotshowTreeWhenMemberOwes: doNotShowTreeWhenMemberOwes, memberTransactions: memberTransactions, isLogedUser: isLogedUser, id: id, name: name, pendingTransactions: pendingTransactions, memberIsOwedItems: memberIsOwedItems, memberOwesItems: memberOwesItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }));
                                    }
                                    return null;
                                })() }), (mode === Mode.Group || isLogedUser) && (_jsx("div", { children: Object.keys(removeZeroesValuesFromTotalSpent).length === 0 ? (_jsx("div", { className: "totalSpent", children: "No recorded spending \uD83D\uDCB0" })) : (_jsxs("div", { className: "totalSpent", children: ["Total spent:", ' ', _jsxs("span", { className: "amounts", children: [' ', joinAmounts(Object.entries(removeZeroesValuesFromTotalSpent))] })] })) }))] }), showSettleUpButton ? (_jsx("div", { className: "settleUpPos", children: _jsx(SettleUpButton, { onClick: () => {
                                menu.value = 'SettleUp';
                                idSelectedToSettleUp.value = id;
                            }, children: "Settle Up" }) })) : null] }), _jsx("div", { className: "guest", children: isGuest ? (_jsx(SettleUpButton, { onClick: () => {
                        menu.value = 'newUser';
                        guestToBeReplaced.value.guestId = id;
                        guestToBeReplaced.value.guestName = name;
                    }, children: "Invite" })) : null })] }));
}
