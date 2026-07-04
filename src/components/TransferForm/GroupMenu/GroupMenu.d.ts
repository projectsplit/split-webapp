import { ReadonlySignal, Signal } from '@preact/signals-react';
import { Group, Guest, Member } from '@/types';
import { TransferState } from '../formStore/formStoreTypes';
interface GroupMenuProps {
    fromHomeGroup: Signal<Group | null> | undefined;
    isnonGroupTransfer: Signal<boolean> | undefined;
    idError: {
        isSenderError: boolean;
        isReceiverError: boolean;
        error: string;
    };
    data: Pick<TransferState, 'senderId' | 'receiverId' | 'errors'>;
    actions: Pick<TransferState, 'toggleSenderId' | 'toggleReceiverId' | 'setError'>;
    userMemberId: string | undefined;
    sortedMembers: ReadonlySignal<(Member | Guest)[]>;
}
export declare const GroupMenu: ({ fromHomeGroup, isnonGroupTransfer, idError, data, actions, userMemberId, sortedMembers, }: GroupMenuProps) => import("react/jsx-runtime").JSX.Element;
export {};
