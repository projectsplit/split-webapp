import { Signal } from '@preact/signals-react';
interface InviteUsersToNewGroupAnimationProps {
    menu: Signal<string | null>;
    newGroup: Signal<{
        groupName: string;
        groupId: string;
    }>;
}
export default function InviteUsersToNewGroupAnimation({ menu, newGroup, }: InviteUsersToNewGroupAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
