import { TransferState } from '../formStore/formStoreTypes';
import { Signal } from '@preact/signals-react';
interface NonGroupMenuProps {
    $noReceiverSelected?: boolean;
    $isSamePersonError: boolean;
    data: Pick<TransferState, 'currencySymbol' | 'errors'>;
    actions: Pick<TransferState, 'setError'>;
    fromHome: boolean | undefined;
    nonGroupMenu: Signal<{
        attribute: string;
        menu: string | null;
        senderId: string;
        receiverId: string;
        senderName: string;
        receiverName: string;
    }>;
}
export declare const NonGroupMenu: ({ $noReceiverSelected, $isSamePersonError, data, actions, fromHome, nonGroupMenu, }: NonGroupMenuProps) => import("react/jsx-runtime").JSX.Element;
export {};
