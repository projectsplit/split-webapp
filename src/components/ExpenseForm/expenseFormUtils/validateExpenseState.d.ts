import { SplitMethod, CategoryMap } from '../formStore/formStoreTypes';
import { PickerMember } from '../../../types';
export declare const validateExpenseState: (amount: string, participantsCategory: SplitMethod, payersCategory: SplitMethod, currencySymbol: string, participantsByCategory: CategoryMap<PickerMember[]>, payersByCategory: CategoryMap<PickerMember[]>) => {
    isValid: boolean;
    errors: {
        amount: string;
        participants: string;
        payers: string;
    };
    showAmountErr: boolean;
    amountErr: string;
    participantsErr: string;
    payersErr: string;
} | {
    isValid: boolean;
    errors: {
        amount?: undefined;
        participants?: undefined;
        payers?: undefined;
    };
    showAmountErr: boolean;
    amountErr: string;
    participantsErr: string;
    payersErr: string;
};
