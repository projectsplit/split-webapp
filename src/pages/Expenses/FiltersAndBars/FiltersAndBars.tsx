import Spinner from "@/components/Spinner/Spinner";
import { StyledFiltersAndBars } from "./FiltersAndBars.styled";
import { renderExpenseFilterPills } from "@/helpers/renderExpenseFilterPills";
import BarsWithLegends from "@/components/BarsWithLegends/BarsWithLegends";
import { ExpenseParsedFilters, Group, TransactionType, TruncatedMember } from "@/types";
import { Signal } from "@preact/signals-react";
import { QueryClient } from "@tanstack/react-query";

interface FiltersAndBarsProps {
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  allParticipants: TruncatedMember[];
  group: Group;
  queryClient: QueryClient;
  transactionType: TransactionType;
  menu: Signal<string | null>;
  totalsAreFetching: boolean;
  totalExpense: number;
  userExpense: number;
  currency: string;
  shouldOpenMultiCurrencyTable: boolean;
}
export const FiltersAndBars = ({
  expenseParsedFilters,
  allParticipants,
  group,
  queryClient,
  transactionType,
  menu,
  totalsAreFetching,
  totalExpense,
  userExpense,
  currency,
  shouldOpenMultiCurrencyTable,
}: FiltersAndBarsProps) => {

  return (
    <StyledFiltersAndBars>
      {totalsAreFetching ? (
        <div className="spinnerTotals">
          <Spinner />
        </div>
      ) : (
        <div className="filtersAndBars">
          <div className="pills">
            {renderExpenseFilterPills(
              expenseParsedFilters,
              allParticipants,
              group,
              queryClient
            )}
          </div>
          <BarsWithLegends
            bar1Legend={
              transactionType === TransactionType.Group
                ? "Group Total"
                : transactionType === TransactionType.NonGroup
                  ? "Total"
                  : ""
            }
            bar2Legend="Your Share"
            bar1Total={totalExpense || 0}
            bar2Total={userExpense || 0}
            currency={currency}
            bar2Color="#e151ee"
            bar1Color="#5183ee"
            onClick={() => {
              if (shouldOpenMultiCurrencyTable) {
                menu.value = "epensesByCurrency";
              }
            }}
          />
        </div>
      )}
    </StyledFiltersAndBars>
  )
}