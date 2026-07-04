import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionType } from '@/types';
import Confirmation from './Confirmation';
import { createJumpToken } from '@/api/auth/helpers/createJumpToken';
import { useNavigate } from 'react-router-dom';
import { getFilterStorageKey } from '@/components/SearchTransactions/helpers/localStorageStringParser';
export const NavigateToExpenseConfirmation = ({ menu, selectedExpense, errorMessage, }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (selectedExpense.value?.transactionType === TransactionType.Group) {
            const jumpToken = createJumpToken(selectedExpense.value.occurred, selectedExpense.value.created);
            localStorage.removeItem(getFilterStorageKey('expense', selectedExpense.value.groupId));
            navigate(`/shared/${selectedExpense.value.groupId}/expenses?jumpTo=${jumpToken}`);
        }
        else if (selectedExpense.value?.transactionType === TransactionType.NonGroup) {
            const jumpToken = createJumpToken(selectedExpense.value.occurred, selectedExpense.value.created);
            localStorage.removeItem(getFilterStorageKey('expense'));
            navigate(`/shared/nongroup/expenses?jumpTo=${jumpToken}`);
        }
        else
            return;
    };
    return (_jsx(Confirmation, { onClick: handleNavigate, menu: menu, isLoading: false, header: 'Confirmation', children: _jsx("div", { children: `You will be navigated to the ${selectedExpense.value?.transactionType === TransactionType.Group ? 'group' : 'non group'} expenses page. Proceed?` }) }));
};
