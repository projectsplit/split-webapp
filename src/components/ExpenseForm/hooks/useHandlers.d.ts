import { PickerMember } from '@/types';
import { Signal } from '@preact/signals-react';
export declare const useHandlers: (participants: PickerMember[], payers: PickerMember[], setShowAmountError: (show: boolean) => void, amount: string, setAmountError: (msg: string) => void, setCurrencySymbol: (value: string) => void, currencyMenu: Signal<string | null>, displayedAmount: Signal<string>, setAmount: (value: string) => void, setParticipantsError: (msg: string) => void, setPayersError: (msg: string) => void, isInitialRender: React.MutableRefObject<boolean>, validateForm: (options: {
    showErrors: boolean;
}) => void, isCreateExpense: boolean, setDescription: (value: string) => void, setDescriptionError: (msg: string) => void, currencySymbol: string) => {
    handleInputBlur: () => void;
    handleCurrencyOptionsClick: (curr: string) => void;
    handleInputChangeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
