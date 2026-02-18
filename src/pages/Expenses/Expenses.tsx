import { useEffect } from "react";
import Expense from "../../components/Expense/Expense";
import { useQueryClient } from "@tanstack/react-query";
import { ExpenseParsedFilters, ExpenseResponseItem, Group, TransactionType, UserInfo, } from "../../types";
import { useOutletContext } from "react-router-dom";
import { StyledExpenses } from "./Expenses.styled";
import { Signal, useSignal } from "@preact/signals-react";
import DetailedExpense from "../../components/DetailedExpense/DetailedExpense";
import { DateOnly } from "../../helpers/timeHelpers";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import ErrorMenuAnimation from "../../components/Animations/ErrorMenuAnimation";
import Sentinel from "../../components/Sentinel";
import GroupTotalsByCurrencyAnimation from "../../components/Animations/GroupTotalsByCurrencyAnimation";
import Spinner from "../../components/Spinner/Spinner";
import { isGroupExpense, isNonGroupExpense } from "../../helpers/getExpenseType";
import { useExpenseList } from "./hooks/useExpenseList";
import { useGetAllNonGroupUsers } from "@/api/auth/QueryHooks/useGetAllNonGroupUsers";
import getAllExpenseParticipants from "@/helpers/getAllExpenseParticipants";
import { groupBy } from "../../helpers/groupBy";
import { NoExpensesFound } from "./NoExpensesFound/NoExpensesFound";
import { FiltersAndBars } from "./FiltersAndBars/FiltersAndBars";
import { useExpenseTotals } from "./hooks/useExpenseTotals";

const Expenses = () => {

  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const errorMessage = useSignal<string>("");
  const menu = useSignal<string | null>(errorMessage.value ? "error" : null);
  const queryClient = useQueryClient();

  const { userInfo, group, showBottomBar, expenseParsedFilters, transactionType,
  } = useOutletContext<{
    userInfo: UserInfo; group: Group; showBottomBar: Signal<boolean>;
    expenseParsedFilters: Signal<ExpenseParsedFilters>; transactionType: TransactionType;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const pageSize = 10;
  const userMemberId = group?.members?.find((m) => m.userId === userInfo?.userId)?.id;//group specific

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching
  } = useExpenseList(transactionType, group, expenseParsedFilters, pageSize, timeZoneId);

  const { allUsers } = useGetAllNonGroupUsers(transactionType);//TODO add condition inside hook if transactionType is Personal to exclude from running
  const expenses = data?.pages.flatMap((p) => p.expenses);

  const allParticipants =
    getAllExpenseParticipants(expenses, transactionType, group?.members || [], group?.guests || [],
      allUsers.map((u) => ({//TODO add condition - not required for personal
        id: u.userId,
        name: u.username,
      }))
    );

  //TODO: add condition to exlcude if transaction type is Personal as different endpoint will be used.
  const { groupTotalsByCurrency, userTotalsByCurrency, totalExpense, userExpense, shouldOpenMultiCurrencyTable, totalsAreFetching } =
    useExpenseTotals(group, transactionType, userInfo, userMemberId, expenseParsedFilters);


  useEffect(() => {
    if (isFetching && !isFetchingNextPage) {
      showBottomBar.value = false;
    } else {
      showBottomBar.value = true;
    }
  }, [isFetching, isFetchingNextPage, showBottomBar]);

  useEffect(() => {
    menu.value = errorMessage.value ? "error" : menu.value;
  }, [errorMessage.value, menu]);

  if (isFetching && !isFetchingNextPage) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  const getUserAmount = (e: ExpenseResponseItem) => {
    if (isGroupExpense(e)) {
      return e.shares.find((x) => x.memberId === userMemberId)?.amount ?? 0;
    }
    if (isNonGroupExpense(e)) {
      return e.shares.find((x) => x.userId === userInfo?.userId)?.amount ?? 0;
    }
    return e.amount;
  };

  return (
    <StyledExpenses>
      {!expenses || expenses.length === 0 ? (
        <NoExpensesFound
          expenseParsedFilters={expenseParsedFilters}
          allParticipants={allParticipants}
          group={group}
          queryClient={queryClient}
        />
      ) : (
        <>
          <FiltersAndBars
            expenseParsedFilters={expenseParsedFilters}
            allParticipants={allParticipants}
            group={group}
            queryClient={queryClient}
            transactionType={transactionType}
            menu={menu}
            totalsAreFetching={totalsAreFetching}
            totalExpense={totalExpense}
            userExpense={userExpense}
            currency={group?.currency || userInfo?.currency}
            shouldOpenMultiCurrencyTable={shouldOpenMultiCurrencyTable}
          />
          {Object.entries(
            groupBy(expenses, (x) => DateOnly(x.occurred, timeZoneId))
          ).map(([date, expenses]) => {
            return (
              <div key={date} className="same-date-container">
                <div className="date-only">{date}</div>
                <div className="expenses">
                  {expenses.map((e) => (
                    <div className="expense" key={e.id}>
                      <Expense
                        amount={e.amount}
                        currency={e.currency}
                        occurred={e.occurred}
                        description={e.description}
                        location={e.location}
                        timeZoneId={timeZoneId}
                        onClick={() => (selectedExpense.value = e)}
                        userAmount={getUserAmount(e)}
                        labels={e.labels}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
      <Sentinel
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {selectedExpense.value && (
        <DetailedExpense
          expenseType={transactionType}
          selectedExpense={selectedExpense}
          amount={selectedExpense.value.amount}
          currency={selectedExpense.value.currency}
          description={selectedExpense.value.description}
          labels={selectedExpense.value.labels}
          location={selectedExpense.value.location}
          occurred={selectedExpense.value.occurred}
          payments={selectedExpense.value.payments}
          shares={selectedExpense.value.shares}
          timeZoneId={timeZoneId}
          timeZoneCoordinates={userInfo.timeZoneCoordinates}
          creator={selectedExpense.value.creatorId}
          created={selectedExpense.value.created}
          participants={allParticipants}
          errorMessage={errorMessage}
          userMemberId={userMemberId || ""}
          group={group}
          userId={userInfo?.userId}
          transactionType={transactionType}
        />
      )}
      <MenuAnimationBackground menu={menu} />
      <ErrorMenuAnimation
        menu={menu}
        message={errorMessage.value}
        type="expense"
      />
      <GroupTotalsByCurrencyAnimation
        menu={menu}
        bar1Legend="Group Total"
        bar2Legend="Your Share"
        bar2Color="#e151ee"
        bar1Color="#5183ee"
        groupTotalsByCurrency={groupTotalsByCurrency}
        userTotalsByCurrency={userTotalsByCurrency}
      />
    </StyledExpenses>
  );
};

export default Expenses;

