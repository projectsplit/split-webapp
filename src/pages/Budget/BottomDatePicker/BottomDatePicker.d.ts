import { Signal } from '@preact/signals-react';
interface BottomDatePickerProps {
    isOpen: Signal<boolean>;
    pickingTarget: Signal<'start' | 'end' | null>;
    startDate: Signal<string>;
    endDate: Signal<string>;
    timeZoneId: string;
    datePeriodClicked: Signal<string>;
    setError: (key: 'amountError' | 'descriptionError' | 'spendingCycleError' | 'scopeError' | 'showAmountError' | 'showDescriptionError' | 'showSpendingCycleError' | 'showScopeError' | 'commencementDayError' | 'showCommencementDayError', value: string | boolean) => void;
}
export default function BottomDatePicker({ isOpen, pickingTarget, startDate, endDate, timeZoneId, datePeriodClicked, setError, }: BottomDatePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
