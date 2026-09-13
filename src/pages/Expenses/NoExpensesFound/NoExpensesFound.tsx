import { renderExpenseFilterPills } from '@/helpers/renderExpenseFilterPills';
import { StyledNoExpensesFound } from './NoExpensesFound.styled';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { CiReceipt } from 'react-icons/ci';
import {
  ExpenseParsedFilters,
  GetLabelsResponse,
  Group,
  Mode,
  TruncatedMember,
} from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';

interface NoExpensesFoundInterface {
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  allParticipants: TruncatedMember[];
  group: Group | null;
  queryClient: QueryClient;
  mode: Mode;
  fetchedUserAndGroupLabels: GetLabelsResponse | undefined;
}
export const NoExpensesFound = ({
  expenseParsedFilters,
  allParticipants,
  group,
  queryClient,
  mode,
  fetchedUserAndGroupLabels,
}: NoExpensesFoundInterface) => {
  const hasAnySearchParams =
    !!expenseParsedFilters.value.before ||
    !!expenseParsedFilters.value.after ||
    (expenseParsedFilters.value.freeText !== '' &&
      expenseParsedFilters.value.freeText !== undefined) ||
    (expenseParsedFilters.value.labels !== undefined &&
      expenseParsedFilters.value.labels.length > 0) ||
    (expenseParsedFilters.value.participantsIds !== undefined &&
      expenseParsedFilters.value.participantsIds.length > 0) ||
    (expenseParsedFilters.value.payersIds !== undefined &&
      expenseParsedFilters.value.payersIds.length > 0);

  return (
    <StyledNoExpensesFound>
      {hasAnySearchParams ? (
        <div className="noFilteredData">
          <div className="pills">
            {renderExpenseFilterPills(
              expenseParsedFilters,
              allParticipants,
              group,
              queryClient,
              mode,
              fetchedUserAndGroupLabels
            )}
          </div>
          <div className="emptyState">
            <div className="msg">
              No expenses found. Have a go and refine your search! 🧐
            </div>
            <FaMagnifyingGlass className="icon" />
          </div>
        </div>
      ) : (
        <div className="emptyState">
          <div className="msg">There are currently no expenses</div>
          <CiReceipt className="icon" />
        </div>
      )}
    </StyledNoExpensesFound>
  );
};
