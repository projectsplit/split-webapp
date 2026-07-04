import { useLayoutEffect } from 'react';
import { recalculateAmounts } from '../recalculateAmounts';
export const useRecalculateAmounts = (memberAmounts, setMemberAmounts, totalAmount, userMemberId, decimalDigits, description, renderCounter, category, ticker, userId, groupMembers, nonGroupUsers, isCreateExpense, isnonGroupExpense) => {
    useLayoutEffect(() => {
        setMemberAmounts(recalculateAmounts(memberAmounts, totalAmount, decimalDigits, category, ticker, isCreateExpense));
        if (totalAmount > 0) {
            if (description === 'Participants' &&
                !memberAmounts.some((m) => m.selected)) {
                const newFormMembers = memberAmounts.map((m) => ({
                    ...m,
                    selected: true,
                    order: renderCounter.current,
                }));
                setMemberAmounts(recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, ticker, isCreateExpense));
            }
            if (description === 'Payers' && !memberAmounts.some((m) => m.selected)) {
                const newFormMembers = memberAmounts.map((m) => ({
                    ...m,
                    selected: isnonGroupExpense &&
                        isnonGroupExpense.value &&
                        nonGroupUsers.value.length > 0
                        ? m.id === userId
                        : isnonGroupExpense &&
                            isnonGroupExpense.value &&
                            groupMembers.value.length > 0
                            ? m.id === userMemberId
                            : m.id === userMemberId,
                    order: renderCounter.current,
                }));
                setMemberAmounts(recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, ticker, isCreateExpense));
            }
        }
        if (totalAmount === 0) {
            const newFormMembers = memberAmounts.map((m) => ({
                ...m,
                selected: false,
                actualAmount: '',
                screenQuantity: '',
                locked: false,
            }));
            setMemberAmounts(newFormMembers);
        }
        return () => { };
    }, [
        totalAmount,
        category.value,
        memberAmounts.length,
        isnonGroupExpense?.value,
    ]);
};
