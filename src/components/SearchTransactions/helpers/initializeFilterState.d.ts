import { Params } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { CreateExpenseFilterRequest, CreateTransferFilterRequest, ExpenseFilter, FetchedLabel, FilteredPeople, GetLabelsResponse, Group, TransferFilter, User } from '../../../types';
export declare const initializeFilterState: (expenseFiltersData: ExpenseFilter, transferFiltersData: TransferFilter, params: Readonly<Params<string>>, expenseFilterState: Signal<CreateExpenseFilterRequest>, transferFilterState: Signal<CreateTransferFilterRequest>, filteredPeople: Signal<FilteredPeople>, filteredLabels: Signal<FetchedLabel[]>, group: Group | null, suggestedLabels: GetLabelsResponse | undefined, users?: User[]) => void;
