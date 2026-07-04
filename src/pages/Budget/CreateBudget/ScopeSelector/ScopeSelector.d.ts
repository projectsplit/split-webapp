import { Signal } from '@preact/signals-react';
export declare const ScopeSelector: ({ onClick, scopeState, targetGroupIds, allGroupsSelected, $inputError, }: ScoleSelectorProps) => import("react/jsx-runtime").JSX.Element;
interface ScoleSelectorProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    scopeState: Signal<{
        personal: boolean;
        group: boolean;
        nonGroup: boolean;
    }>;
    targetGroupIds: Signal<string[]>;
    allGroupsSelected: Signal<boolean>;
    $inputError: boolean;
}
export {};
