import { Signal } from '@preact/signals-react';
export declare const SecondPage: ({ data, actions, scopeMenu }: SecondPageProps) => import("react/jsx-runtime").JSX.Element;
interface SecondPageProps {
    scopeMenu: Signal<string | null>;
    data: {
        description: string;
        scopeState: Signal<{
            none: boolean;
            personal: boolean;
            group: boolean;
            nonGroup: boolean;
        }>;
        targetGroupIds: Signal<string[]>;
        allGroupsSelected: Signal<boolean>;
        errors: {
            descriptionError: string;
            scopeError: string;
            showDescriptionError: boolean;
            showScopeError: boolean;
        };
    };
    actions: {
        setDescription: (description: string) => void;
        setError: (key: 'amountError' | 'descriptionError' | 'spendingCycleError' | 'scopeError' | 'showAmountError' | 'showDescriptionError' | 'showSpendingCycleError' | 'showScopeError' | 'commencementDayError' | 'showCommencementDayError', value: string | boolean) => void;
    };
}
export {};
