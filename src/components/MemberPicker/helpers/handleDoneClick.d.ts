import { Signal } from '@preact/signals-react';
import { PickerMember } from '../../../types';
export declare const handleDoneClick: (description: string, memberAmounts: PickerMember[], setError: React.Dispatch<React.SetStateAction<string>>, errorMenu: Signal<string>, selectedCurrency: string, totalAmount: number, setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
