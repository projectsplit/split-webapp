import { InactiveBudgetsInfoResponseItem } from '@/types';
import { Signal } from '@preact/signals-react';
interface InactiveBudgetProps {
    budget: InactiveBudgetsInfoResponseItem;
    onActivate: () => void;
    menu: Signal<string | null>;
    timeZoneId: string;
}
export declare const InactiveBudget: ({ budget, onActivate, menu, timeZoneId, }: InactiveBudgetProps) => import("react/jsx-runtime").JSX.Element;
export {};
