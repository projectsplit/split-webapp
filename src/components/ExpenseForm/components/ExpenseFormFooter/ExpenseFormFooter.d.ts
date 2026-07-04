import { Signal } from '@preact/signals-react';
import { GeoLocation, Coordinates } from '@/types';
interface ExpenseFormFooterProps {
    onSubmit: () => void;
    isCreateExpense: boolean;
    isPendingCreateExpense: boolean;
    isPendingEditExpense: boolean;
    location: GeoLocation | undefined;
    isMapOpen: Signal<boolean>;
    timeZoneCoordinates: Coordinates;
    setLocation: (location: GeoLocation | undefined) => void;
    setDescriptionError: (value: string) => void;
    expenseTime: string;
    setExpenseTime: (value: string | ((prev: string) => string)) => void;
    timeZoneId: string;
    isDateShowing: Signal<boolean>;
    showPicker: boolean;
    setShowPicker: (value: boolean) => void;
}
export declare const ExpenseFormFooter: ({ onSubmit, isCreateExpense, isPendingCreateExpense, isPendingEditExpense, location, isMapOpen, timeZoneCoordinates, setLocation, setDescriptionError, expenseTime, setExpenseTime, timeZoneId, isDateShowing, showPicker, setShowPicker, }: ExpenseFormFooterProps) => import("react/jsx-runtime").JSX.Element;
export {};
