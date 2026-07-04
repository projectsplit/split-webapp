import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { displayCurrencyAndAmount } from '../../../../helpers/displayCurrencyAndAmount';
import { StyledMemberDetailedDescription } from './MemberDetailedDescription.Styled';
import { getUserName } from '@/helpers/getUserName';
import { Mode } from '@/types';
export const MemberDetailedDescription = ({ memberTransactions, pendingTransactions, id, isLogedUser, isOwed, name, participants, userOrMemberId, mode, }) => {
    const doNotshowTreeWhenMemberOwes = pendingTransactions.filter((p) => p.debtor === id).length === 1;
    const doNotshowTreeWhenMemberIsOwed = pendingTransactions.filter((p) => p.creditor === id).length === 1;
    return (_jsxs(StyledMemberDetailedDescription, { isOwed: isOwed, children: [isLogedUser ? (_jsx("strong", { className: "name", children: "You" })) : (_jsx("strong", { className: "name", children: name })), "\u00A0", isOwed && isLogedUser ? (_jsx("span", { className: "owingText", children: "are owed" })) : !isOwed && isLogedUser ? (_jsx("span", { className: "owingText", children: "owe" })) : isOwed && !isLogedUser ? (_jsx("span", { className: "owingText", children: "is owed" })) : (_jsx("span", { className: "owingText", children: "owes" })), "\u00A0", ' ', memberTransactions
                .filter((mt) => mt.isOwed === isOwed)
                .map((mt, index, array) => {
                const formattedAmount = displayCurrencyAndAmount(mt.totalAmount.value.toString(), mt.currency);
                const isSecondToLast = index === array.length - 2;
                const isLast = index === array.length - 1;
                if (isLast && array.length > 1) {
                    return (_jsxs("div", { className: "and", children: [' ', _jsx("span", { className: "owingText", children: "and" }), ' ', _jsxs("span", { className: "amount", children: [formattedAmount, " "] }), _jsx("span", { className: "owingText", children: mode === Mode.NonGroup && !isLogedUser ? (_jsxs(_Fragment, { children: [isOwed ? 'from ' : 'to ', _jsx("strong", { style: { color: '#FFFFFF' }, children: "you" })] })) : ('in total') })] }, index));
                }
                return (_jsxs(React.Fragment, { children: [_jsxs("span", { className: "amount", style: {
                                marginRight: array.length === 1 &&
                                    (doNotshowTreeWhenMemberOwes ||
                                        doNotshowTreeWhenMemberIsOwed)
                                    ? '4px'
                                    : '0px',
                            }, children: [formattedAmount, ' ', array.length === 1 &&
                                    !doNotshowTreeWhenMemberOwes &&
                                    !doNotshowTreeWhenMemberIsOwed ? (_jsx("span", { className: "owingText", children: mode === Mode.NonGroup && !isLogedUser ? (_jsxs(_Fragment, { children: [isOwed ? 'from ' : 'to ', _jsx("strong", { style: { color: '#FFFFFF' }, children: "you" })] })) : ('in total') })) : ('')] }), _jsx("div", { className: "transaction-container", children: array.length === 1 &&
                                doNotshowTreeWhenMemberOwes &&
                                isOwed === false
                                ? pendingTransactions
                                    .filter((p) => p.debtor === id)
                                    .map((p, index) => (_jsxs("div", { className: "transaction", children: [_jsx("span", { className: "preposition", children: "to" }), ' ', _jsx("strong", { children: getUserName(p, participants, userOrMemberId, 'to') })] }, index)))
                                : array.length === 1 &&
                                    doNotshowTreeWhenMemberIsOwed &&
                                    isOwed
                                    ? pendingTransactions
                                        .filter((p) => p.creditor === id)
                                        .map((p, index) => (_jsxs("div", { className: "transaction", children: [_jsx("span", { className: "preposition", children: "from" }), ' ', _jsx("strong", { children: getUserName(p, participants, userOrMemberId, 'from') })] }, index)))
                                    : '' }), !isLast && !isSecondToLast && _jsx("span", { className: "comma", children: "," }), "\u00A0"] }, index));
            })] }));
};
