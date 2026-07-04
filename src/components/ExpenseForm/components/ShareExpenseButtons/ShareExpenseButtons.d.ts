import { Signal } from '@preact/signals-react';
import { PickerMember, User } from '@/types';
export declare const ShareExpenseButtons: ({ isPersonal, amountNumber, nonGroupUsers, adjustParticipants, adjustPayers, fromHome, nonGroupMenu, setMakePersonalClicked, }: ShareExpenseButtonsProps) => import("react/jsx-runtime").JSX.Element;
interface ShareExpenseButtonsProps {
    isPersonal: Signal<boolean>;
    amountNumber: number;
    nonGroupUsers: Signal<User[]>;
    adjustParticipants: PickerMember[];
    adjustPayers: PickerMember[];
    fromHome: boolean | undefined;
    nonGroupMenu: Signal<string | null> | undefined;
    setMakePersonalClicked: (value: boolean) => void;
}
export {};
