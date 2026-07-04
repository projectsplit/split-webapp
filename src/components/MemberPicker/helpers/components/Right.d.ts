import { Signal } from '@preact/signals-react';
import { PickerMember } from '../../../../types';
interface RightProps {
    screenQuantity: string;
    id: string;
    locked: boolean;
    selectedCurrency: string;
    handleInputBlur: (id: string) => void;
    changeAmount: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleLock: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
    category: Signal<string>;
    memberAmounts: PickerMember[];
    inputRef: (el: HTMLInputElement | null) => void;
}
declare const _default: import("react").NamedExoticComponent<RightProps>;
export default _default;
