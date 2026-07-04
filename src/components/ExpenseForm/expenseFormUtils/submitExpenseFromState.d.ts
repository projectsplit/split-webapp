import { CategoryMap } from '../formStore/formStoreTypes';
import { ExpenseRequest, FormExpense, GeoLocation, Label, PickerMember, Group } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare function submitExpenseFromState(state: {
    amount: string;
    description: string;
    currencySymbol: string;
    expenseTime: string;
    labels: Label[];
    location: GeoLocation | undefined;
    participantsByCategory: CategoryMap<PickerMember[]>;
    payersByCategory: CategoryMap<PickerMember[]>;
    participantsCategory: Signal<string>;
    payersCategory: Signal<string>;
    setAmountError: (msg: string) => void;
    setDescriptionError: (msg: string) => void;
    setIsSubmitting: (value: boolean) => void;
    setShowAmountError: (value: boolean) => void;
}, inputs: {
    groupId?: string;
    createExpenseMutation: (req: ExpenseRequest) => void;
    editExpenseMutation: (req: ExpenseRequest) => void;
    isCreateExpense: boolean;
    expense: FormExpense | null;
    isnonGroupExpense?: Signal<boolean>;
    fromPersonal?: boolean;
    fromHomeGroup?: Signal<Group | null>;
}): void;
