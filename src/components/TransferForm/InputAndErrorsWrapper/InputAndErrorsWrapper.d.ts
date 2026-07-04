import { Signal } from '@preact/signals-react';
import { TransferState } from '../formStore/formStoreTypes';
interface InputAndErrorsWrapperProps {
    currencyMenu: Signal<string | null>;
    displayedAmount: Signal<string>;
    data: Pick<TransferState, 'currencySymbol' | 'errors'>;
    actions: Pick<TransferState, 'setAmount' | 'setError'>;
    handleInputBlur: () => void;
}
export declare const InputAndErrorsWrapper: ({ currencyMenu, displayedAmount, data, actions, handleInputBlur, }: InputAndErrorsWrapperProps) => import("react/jsx-runtime").JSX.Element;
export {};
