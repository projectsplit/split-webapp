import { Signal } from '@preact/signals-react';
import { PickerMember } from '../../../types';
export declare const recalculateAmounts: (formMembers: PickerMember[], totalAmount: number, decimalDigits: number, category: Signal<string>, ticker: string, isCreateExpense: boolean) => PickerMember[];
