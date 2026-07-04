import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { useSignal } from '@preact/signals-react';
import { useParams } from 'react-router-dom';
import { StyledSettleUpOptions } from './SettleUpOptions.Styled';
import { DateTime } from 'luxon';
import MyButton from '../../../components/MyButton/MyButton';
import { useTheme } from 'styled-components';
import { getUserName } from '@/helpers/getUserName';
import { useMultipleTransfers } from '@/api/auth/CommandHooks/useMultipleTransfers';
export default function SettleUpOptions({ pendingTransactions, idSelectedToSettleUp, menu, members, userId, }) {
    const selectedItem = useSignal([0]);
    const params = useParams();
    const groupId = params?.groupid;
    const { mutate: submitMultipleTransfers, isPending } = useMultipleTransfers(menu, groupId);
    const enabled = selectedItem.value.length > 0;
    const theme = useTheme();
    const memberPendingTransactions = pendingTransactions.filter((p) => p.debtor === idSelectedToSettleUp.value ||
        p.creditor === idSelectedToSettleUp.value);
    const submitButtonHandler = () => {
        const selectedTransactions = selectedItem.value.map((index) => memberPendingTransactions[index]);
        const transfers = selectedTransactions.map((transaction) => ({
            description: 'Settled Debt',
            amount: transaction.amount,
            currency: transaction.currency,
            receiverId: transaction.creditor,
            senderId: transaction.debtor,
            occurred: DateTime.now().toUTC().toISO(),
        }));
        const createTransfersRequest = {
            groupId,
            transfers,
        };
        submitMultipleTransfers(createTransfersRequest);
    };
    return (_jsxs(StyledSettleUpOptions, { children: [_jsx("strong", { className: "header", children: "Settle Up" }), memberPendingTransactions.map((p, index) => (_jsxs("div", { className: `settleUpOption ${selectedItem.value.includes(index) ? 'clicked' : ''}`, onClick: () => {
                    if (selectedItem.value.includes(index)) {
                        selectedItem.value = selectedItem.value.filter((i) => i !== index);
                    }
                    else {
                        selectedItem.value = [...selectedItem.value, index];
                    }
                }, children: [_jsx("span", { className: "currencyOwes", style: {
                            color: p.creditor === idSelectedToSettleUp.value
                                ? theme.green
                                : theme.redish,
                        }, children: displayCurrencyAndAmount(p.amount.toString(), p.currency) }), ' ', "\u00A0", _jsxs("div", { className: "text", children: [_jsxs("span", { className: "preposition", children: [_jsx("span", { className: "word1", children: "from" }), _jsx("span", { className: "word2", children: getUserName(p, members, userId, 'from') })] }), "\u00A0", _jsxs("span", { className: "preposition", children: [_jsx("span", { className: "word1", children: "to" }), _jsx("span", { className: "word2", children: getUserName(p, members, userId, 'to') })] }), ' ', "\u00A0"] })] }, index))), _jsxs("div", { className: "settleUpButton", children: [' ', _jsx(MyButton, { onClick: () => submitButtonHandler(), disabled: !enabled, isLoading: isPending, children: "Settle Up" })] })] }));
}
