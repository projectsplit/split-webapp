import { Signal } from '@preact/signals-react';
export default function MakeBudgetActiveMenu({ menu, title, hasActiveBudgetData, hasInactiveBudgetData, onConfirm, }: MakeBudgetActiveMenuProps): import("react/jsx-runtime").JSX.Element;
interface MakeBudgetActiveMenuProps {
    title: string;
    menu: Signal<string | null>;
    hasActiveBudgetData: boolean;
    hasInactiveBudgetData: boolean;
    onConfirm: (activate: boolean) => void;
}
export {};
