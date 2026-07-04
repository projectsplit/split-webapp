import { Signal } from '@preact/signals-react';
import { CreateExpenseFilterRequest, CreateTransferFilterRequest, DateConstraint } from '../../../types';
export declare const addExistingTriggerElement: (filterState: Signal<CreateExpenseFilterRequest | CreateTransferFilterRequest>, arrayToAddElement: DateConstraint[]) => DateConstraint[];
