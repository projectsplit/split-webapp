import { Signal } from '@preact/signals-react';
interface InviteUsersToNewGroupProps {
    menu: Signal<string | null>;
    nodeRef: React.RefObject<HTMLDivElement>;
    newGroup: Signal<{
        groupName: string;
        groupId: string;
    }>;
}
export declare const InviteUsersToNewGroup: ({ menu, newGroup, }: InviteUsersToNewGroupProps) => import("react/jsx-runtime").JSX.Element;
export {};
