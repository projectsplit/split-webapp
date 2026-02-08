import { Signal } from "@preact/signals-react";
import { ExpenseResponseItem } from "../../../types";
import { useDeleteExpense } from "./useDeleteExpense";
import { useDeleteNonGroupExpense } from "./useDeleteNonGroupExpense";

export function useDeleteExpenseMutation(
    menu: Signal<string | null>,
    errorMessage: Signal<string>,
    selectedExpense: Signal<ExpenseResponseItem | null>,
) {
    const hasGroup = !!selectedExpense.value?.groupId;

    const normal = useDeleteExpense(menu, errorMessage, selectedExpense);
    const nonGroup = useDeleteNonGroupExpense(menu, errorMessage, selectedExpense);

    return hasGroup ? normal : nonGroup;
}