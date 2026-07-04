import { Signal } from '@preact/signals-react';
export declare const ScopeSelectionMenu: ({ menu, scopeState, targetGroupIds, allGroupsSelected, }: ScopeSelectionMenuProps) => import("react/jsx-runtime").JSX.Element;
interface ScopeSelectionMenuProps {
    menu: Signal<string | null>;
    scopeState: Signal<{
        none: boolean;
        personal: boolean;
        group: boolean;
        nonGroup: boolean;
    }>;
    targetGroupIds: Signal<string[]>;
    allGroupsSelected: Signal<boolean>;
}
export {};
