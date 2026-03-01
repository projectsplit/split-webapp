import { renderExpenseFilterPills } from "@/helpers/renderExpenseFilterPills";
import { StyledNoExpensesFound } from "./NoExpensesFound.styled"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiReceipt } from "react-icons/ci";
import { ExpenseParsedFilters, Group, Mode, TruncatedMember } from "@/types";
import { Signal } from "@preact/signals-react";
import { QueryClient } from "@tanstack/react-query";

interface NoExpensesFoundInterface {
  expenseParsedFilters: Signal<ExpenseParsedFilters>
  allParticipants: TruncatedMember[]
  group: Group | null
  queryClient: QueryClient
  mode: Mode
}
export const NoExpensesFound = ({ expenseParsedFilters, allParticipants, group, queryClient, mode }: NoExpensesFoundInterface) => {

  const hasAnySearchParams =
    !!expenseParsedFilters.value.before ||
    !!expenseParsedFilters.value.after ||
    (expenseParsedFilters.value.freeText !== "" &&
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
              mode
            )}
          </div>
          <div className="textAndIcon">
            <span className="text">
              No expenses found. Have a go and refine your search!
            </span>
            <span className="emoji">🧐</span>
            <FaMagnifyingGlass className="icon" />
          </div>
          <div />
        </div>
      ) : (
        <div className="noData">
          <div className="msg">There are currently no expenses</div>
          <CiReceipt className="icon" />
        </div>
      )}
    </StyledNoExpensesFound>
  )
}