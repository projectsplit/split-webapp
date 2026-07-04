import { Signal } from '@preact/signals-react';
export declare const SearchResultItem: React.FC<{
    userId: string;
    username: string;
    isAlreadyInvited: boolean;
    isGroupMember: boolean;
    groupId: string;
    onInviteSuccess: (wasInvited: boolean) => void;
    guestId?: string;
    userInvitationSent: Signal<boolean>;
    guestName?: string;
}>;
