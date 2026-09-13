import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  ExpenseParsedFilters,
  FetchedLabel,
  FilteredPeople,
  TransferParsedFilters,
} from '../../../types';
import { EditorContentHandle } from '../../../interfaces';
import { getFilterStorageKey } from './localStorageStringParser';

export const handleClearAllClick = (
  editorContentRef: React.MutableRefObject<EditorContentHandle | null>,
  expenseFilterState: Signal<CreateExpenseFilterRequest>,
  transferFilterState: Signal<CreateTransferFilterRequest>,
  filteredPeople: Signal<FilteredPeople>,
  filteredLabels: Signal<FetchedLabel[]>,
  submitButtonIsActive: Signal<boolean>,
  menu: Signal<string | null>,
  queryClient: QueryClient,
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  transferParsedFilters: Signal<TransferParsedFilters>,
  isPersonal?: boolean
) => {
  const expenseGroupId = expenseFilterState.value.groupId;
  const transferGroupId = transferFilterState.value.groupId;

  if (editorContentRef.current) {
    editorContentRef.current.clearEditor();
  }

  expenseFilterState.value = {
    groupId: expenseGroupId,
    participantsIds: [],
    payersIds: [],
    freeText: '',
    before: [],
    during: [],
    after: [],
    labels: [],
  };

  transferFilterState.value = {
    groupId: transferGroupId,
    receiversIds: [],
    sendersIds: [],
    freeText: '',
    before: [],
    during: [],
    after: [],
  };

  filteredPeople.value = {
    payers: [],
    participants: [],
    senders: [],
    receivers: [],
  };
  filteredLabels.value = [];
  submitButtonIsActive.value = false;

  const clearedExpenseFilter = {
    groupId: expenseGroupId,
    participantsIds: [],
    payersIds: [],
    freeText: '',
    before: null,
    after: null,
    labels: [],
  };

  const clearedTransferFilter = {
    groupId: transferGroupId,
    receiversIds: [],
    sendersIds: [],
    freeText: '',
    before: null,
    after: null,
  };

  sessionStorage.setItem(
    getFilterStorageKey('expense', expenseGroupId, isPersonal),
    JSON.stringify(clearedExpenseFilter)
  );
  sessionStorage.setItem(
    getFilterStorageKey('transfer', transferGroupId),
    JSON.stringify(clearedTransferFilter)
  );

  expenseParsedFilters.value = clearedExpenseFilter;
  transferParsedFilters.value = clearedTransferFilter;

  if (expenseGroupId) {
    queryClient.invalidateQueries({
      queryKey: ['groupExpenses'],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['groupTransfers'],
      exact: false,
    });
  } else {
    queryClient.invalidateQueries({
      queryKey: ['nonGroupExpenses'],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['nonGroupTransfers'],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['personalExpenses'],
      exact: false,
    });
  }

  menu.value = null;
};
