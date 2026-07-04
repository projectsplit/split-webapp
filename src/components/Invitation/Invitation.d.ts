import React from 'react';
import { Signal } from '@preact/signals-react';
declare const Invitation: React.FC<InvitationProps>;
export default Invitation;
type InvitationProps = {
    invitation: {
        id: string;
        created: string;
        senderId: string;
        receiverId: string;
        groupId: string;
        groupName: string;
        guestId: string | null;
        guestName: string | null;
    };
    menu: Signal<string | null>;
    timeZoneId: string | undefined;
};
