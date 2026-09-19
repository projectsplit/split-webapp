import { StyledFiltersAndBars } from '@/components/FiltersAndBars/FiltersAndBars.styled';
import { FiltersAndBarsSkeleton } from '@/components/FiltersAndBarsSkeleton/FiltersAndBarsSkeleton';
import { renderExpenseFilterPills } from '@/helpers/renderExpenseFilterPills';
import BarsWithLegends from '@/components/BarsWithLegends/BarsWithLegends';
import {
  ExpenseParsedFilters,
  GetLabelsResponse,
  Group,
  Mode,
  TruncatedMember,
} from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';

interface FiltersAndBarsProps {
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  allParticipants: TruncatedMember[];
  group: Group;
  queryClient: QueryClient;
  mode: Mode;
  menu: Signal<string | null>;
  totalsAreFetching: boolean;
  totalExpense: number;
  userExpense: number;
  currency: string;
  fetchedUserAndGroupLabels: GetLabelsResponse | undefined;
  hasUserTotal: boolean;
}
export const FiltersAndBars = ({
  expenseParsedFilters,
  allParticipants,
  group,
  queryClient,
  mode,
  menu,
  totalsAreFetching,
  totalExpense,
  userExpense,
  currency,
  fetchedUserAndGroupLabels,
  hasUserTotal,
}: FiltersAndBarsProps) => {
  const showBars = mode !== Mode.Personal || hasUserTotal;

  return (
    <StyledFiltersAndBars>
      {totalsAreFetching ? (
        <FiltersAndBarsSkeleton mode={mode} />
      ) : (
        <div className="filtersAndBars">
          <div className="pills" onTouchStart={(e) => e.stopPropagation()}>
            {renderExpenseFilterPills(
              expenseParsedFilters,
              allParticipants,
              group,
              queryClient,
              mode,
              fetchedUserAndGroupLabels
            )}
          </div>
          {showBars ? (
            <BarsWithLegends
              mode={mode}
              bar1Legend={
                mode === Mode.Group
                  ? 'Group Total'
                  : mode === Mode.NonGroup
                    ? 'Total'
                    : ''
              }
              bar2Legend={mode === Mode.Personal ? 'Spent' : 'Your Share'}
              bar1Total={totalExpense || 0}
              bar2Total={userExpense || 0}
              currency={currency}
              onClick={() => {
                menu.value = 'epensesByCurrency';
              }}
            />
          ) : null}
        </div>
      )}
    </StyledFiltersAndBars>
  );
};
