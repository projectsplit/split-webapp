import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import { Member, Guest, User, UserInfo, Group } from '../../../types';
interface UseTransferFormLogicProps {
    userInfo: UserInfo | undefined;
    groupId: string | undefined;
    groupMembers: Signal<(Member | Guest)[]>;
    menu: Signal<string | null>;
    nonGroupUsers: Signal<User[]>;
    isnonGroupTransfer: Signal<boolean> | undefined;
    nonGroupMenu: Signal<{
        attribute: string;
        menu: string | null;
        senderId: string;
        senderName: string;
        receiverId: string;
        receiverName: string;
    }> | undefined;
    fromHomeGroup: Signal<Group | null> | undefined;
    navigate: NavigateFunction;
    isSubmitting: Signal<boolean>;
    displayedAmount: Signal<string>;
    currencyMenu: Signal<string | null>;
    data: ReturnType<typeof import('./useTransferFormStore').useTransferData>;
    actions: ReturnType<typeof import('./useTransferFormStore').useTransferActions>;
}
export declare const useTransferFormLogic: ({ userInfo, groupId, groupMembers, menu, nonGroupUsers, isnonGroupTransfer, nonGroupMenu, fromHomeGroup, navigate, isSubmitting, displayedAmount, currencyMenu, data, actions, }: UseTransferFormLogicProps) => {
    handleInputBlur: () => void;
    handleCurrencyOptionsClick: (curr: string) => void;
    submitTransfer: () => void;
    userMemberId: string | undefined;
    noReceiverSelected: boolean;
    isSamePerson: boolean;
    sortedMembers: import("@preact/signals-core").ReadonlySignal<(Member | Guest)[]>;
    idError: {
        isSenderError: boolean;
        isReceiverError: boolean;
        error: string;
    };
    isPendingCreateTransfer: boolean;
};
export {};
