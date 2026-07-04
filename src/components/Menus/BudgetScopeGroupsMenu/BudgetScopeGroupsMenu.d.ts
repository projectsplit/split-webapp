import { Signal } from '@preact/signals-react';
import { Group } from '@/types';
interface BudgetScopeGroupsMenuProps {
    targetGroupIds: Signal<string[]>;
    setKeyword: (keyword: string) => void;
    keyword: string;
    flattenedGroups: Group[] | undefined;
    allGroupsSelected: Signal<boolean>;
    hasNextGroupsPage: boolean;
}
export declare const BudgetScopeGroupsMenu: ({ targetGroupIds, setKeyword, keyword, flattenedGroups, allGroupsSelected, hasNextGroupsPage, }: BudgetScopeGroupsMenuProps) => import("react/jsx-runtime").JSX.Element;
export {};
