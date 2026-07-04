import { Frequency } from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';
export declare const calendarTypeHandlerFn: (frequency: Frequency, calendarDay: Signal<string>, budgetFrequency: Signal<Frequency>, startDate: Signal<string>, endDate: Signal<string>, openCustomDateCalendar: Signal<boolean>, pickingTarget: Signal<"start" | "end" | null>, hasSwitchedBudgetType: Signal<boolean>, queryClient: QueryClient, isStale: boolean) => void;
