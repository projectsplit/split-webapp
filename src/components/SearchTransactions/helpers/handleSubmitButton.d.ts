import { EditorState } from 'lexical';
import { Signal } from '@preact/signals-react';
import { CreateExpenseFilterRequest, CreateTransferFilterRequest, ExpenseParsedFilters, TransferParsedFilters } from '../../../types';
import { QueryClient } from '@tanstack/react-query';
export declare const handleSubmitButton: (editorState: EditorState | null, expenseFilterState: Signal<CreateExpenseFilterRequest>, transferFilterState: Signal<CreateTransferFilterRequest>, menu: Signal<string | null>, category: Signal<string>, queryClient: QueryClient, expenseParsedFilters: Signal<ExpenseParsedFilters>, transferParsedFilters: Signal<TransferParsedFilters>, isPersonal?: boolean) => void;
