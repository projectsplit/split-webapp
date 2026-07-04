import { PickerMember } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const errorSettingFn: (description: string, memberAmounts: PickerMember[], setError: React.Dispatch<React.SetStateAction<string>>, errorMenu: Signal<string>, selectedCurrency: string, totalAmount: number) => void;
