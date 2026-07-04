import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import Confirmation from './Confirmation';
import { useDeleteExpenseMutation } from '@/api/auth/CommandHooks/useDeleteExpenseMutation';
export default function DeleteExpenseConfirmation({ menu, description, selectedExpense, errorMessage, }) {
    const { mutate: deleteExpense, isPending } = useDeleteExpenseMutation(menu, errorMessage, selectedExpense);
    const expenseId = selectedExpense.value?.id;
    const handleDelete = () => {
        if (!expenseId)
            return;
        deleteExpense(expenseId);
    };
    return (_jsx(Confirmation, { onClick: handleDelete, menu: menu, isLoading: isPending, header: 'Confirmation', children: description ? (_jsxs("div", { children: ["Are you sure you want to delete", ' ', _jsxs("span", { className: "descr", children: ["\"", description, "\""] }), " ?", ' '] })) : (_jsx("div", { children: "Delete this expense?" })) }));
}
