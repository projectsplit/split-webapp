import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledMembersInfoBox } from './MembersInfoBox.Styled';
import InfoBox from '../InfoBox/InfoBox';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import Currency from 'currency.js';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { TransactionType, } from '../../../types';
export default function MembersInfoBox({ transactions, areShares, currency, participants, userMemberId, userId, expenseType, }) {
    const [hide, setHide] = React.useState(false);
    const getId = (t) => {
        if ('memberId' in t) {
            return t.memberId;
        }
        return t.userId;
    };
    const sortedTransactions = [...(transactions || [])].sort((a, b) => {
        if (expenseType === TransactionType.Group) {
            const aId = getId(a);
            const bId = getId(b);
            if (aId === userMemberId)
                return -1;
            if (bId === userMemberId)
                return 1;
            return 0;
        }
        else {
            const aId = getId(a);
            const bId = getId(b);
            if (aId === userId)
                return -1;
            if (bId === userId)
                return 1;
            return 0;
        }
    });
    const totalAmount = transactions?.reduce((acc, { amount }) => acc.add(amount), Currency(0));
    return (_jsx(StyledMembersInfoBox, { onClick: () => setHide((hide) => !hide), children: _jsxs(InfoBox, { children: [_jsxs("div", { className: "topStripe", children: [areShares ? (_jsx("div", { className: "info", children: sortedTransactions?.length === 1 ? (_jsxs("span", { children: ["billed to ", sortedTransactions?.length, ' ', expenseType === TransactionType.Group ? 'member' : 'user'] })) : sortedTransactions?.length === 2 ? (_jsxs("span", { children: ["Split between ", sortedTransactions?.length, ' ', expenseType === TransactionType.Group ? 'members' : 'users'] })) : (_jsxs("span", { children: [' ', "Split among ", sortedTransactions?.length, ' ', expenseType === TransactionType.Group ? 'members' : 'users'] })) })) : (_jsx("div", { className: "info", children: sortedTransactions?.length === 1 ? (_jsxs("span", { children: ["Paid by ", sortedTransactions?.length, ' ', expenseType === TransactionType.Group ? 'member' : 'user'] })) : (_jsxs("span", { children: ["Paid by ", sortedTransactions?.length, ' ', expenseType === TransactionType.Group ? 'members' : 'users'] })) })), _jsxs("div", { className: "hideDetalailsButton", children: [hide ? _jsx(IoIosArrowDown, {}) : _jsx(IoIosArrowUp, {}), ' '] })] }), !hide && (_jsx("div", { className: "memberInfoStripe", children: sortedTransactions.map((t, i) => {
                        const id = getId(t);
                        return (_jsxs("div", { className: "member", children: [_jsx("span", { className: "memberName", children: id === userMemberId || id === userId ? (_jsx("span", { className: "you", children: "You" })) : (participants.find((x) => x.id === id)?.name) }), _jsx("span", { className: "amount", children: id === userMemberId || id === userId ? (_jsx("span", { className: "yourAmount", children: displayCurrencyAndAmount(t.amount.toString(), currency) })) : (displayCurrencyAndAmount(t.amount.toString(), currency)) }), _jsxs("span", { className: "percentage", children: [' ', id === userMemberId || id === userId ? (_jsxs("span", { className: "yourPercentage", children: [totalAmount && totalAmount.value !== 0
                                                    ? ((t.amount / totalAmount.value) * 100).toFixed(1)
                                                    : '0.0', "%"] })) : (_jsxs("span", { children: [totalAmount && totalAmount.value !== 0
                                                    ? ((t.amount / totalAmount.value) * 100).toFixed(1)
                                                    : '0.0', "%", ' '] }))] })] }, i));
                    }) }))] }) }));
}
