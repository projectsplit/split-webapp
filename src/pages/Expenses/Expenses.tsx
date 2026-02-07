import { useEffect } from "react";
import Expense from "../../components/Expense/Expense";
import { useQueryClient } from "@tanstack/react-query";
import {
  ExpenseParsedFilters,
  ExpenseResponseItem,
  Group,
  TransactionType,
  UserInfo,
} from "../../types";
import { useOutletContext } from "react-router-dom";
import { StyledExpenses } from "./Expenses.styled";
import BarsWithLegends from "../../components/BarsWithLegends/BarsWithLegends";
import { CiReceipt } from "react-icons/ci";
import { Signal, useSignal } from "@preact/signals-react";
import DetailedExpense from "../../components/DetailedExpense/DetailedExpense";
import { DateOnly } from "../../helpers/timeHelpers";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import ErrorMenuAnimation from "../../components/Menus/MenuAnimations/ErrorMenuAnimation";
import Sentinel from "../../components/Sentinel";
import useDebts from "../../api/services/useDebts";
import {
  getAllCurrencyTotals,
  getGroupTotalByCurrency,
  getCurrencyValues,
} from "../../helpers/getGroupTotalByCurrency";
import GroupTotalsByCurrencyAnimation from "../../components/Menus/MenuAnimations/GroupTotalsByCurrencyAnimation";
import Spinner from "../../components/Spinner/Spinner";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { renderExpenseFilterPills } from "../../helpers/renderExpenseFilterPills";
import {
  isGroupExpense,
  isNonGroupExpense,
} from "../../helpers/getExpenseType";
import { useExpenseList } from "./hooks/useExpenseList";
import { getFilterStorageKey } from "@/components/SearchTransactions/helpers/localStorageStringParser";
import { useGetNonGroupExpensesUsers } from "@/api/services/useGetNonGroupExpensesUsers";
import getAllExpenseParticipants from "@/helpers/getAllExpenseParticipants";

const Expenses = () => {
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const errorMessage = useSignal<string>("");
  const menu = useSignal<string | null>(errorMessage.value ? "error" : null);
  const queryClient = useQueryClient();
  const {
    userInfo,
    group,
    showBottomBar,
    expenseParsedFilters,
    transactionType,
  } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
    expenseParsedFilters: Signal<ExpenseParsedFilters>;
    transactionType: TransactionType;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const pageSize = 10;
  const userMemberId = group?.members?.find((m) => m.userId === userInfo?.userId)?.id;//group specific

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching
  } = useExpenseList(
    transactionType,
    group,
    expenseParsedFilters,
    pageSize,
    timeZoneId
  );

  const { data: nonGroupUsersData } = useGetNonGroupExpensesUsers(transactionType);
  const expenses = data?.pages.flatMap((p) => p.expenses);
  const allParticipants = getAllExpenseParticipants(
    expenses,
    transactionType,
    group?.members || [],
    group?.guests || [],
    nonGroupUsersData?.data.users.map((u) => ({
      id: u.userId,
      name: u.username,
    })) || []
  );

  const { data: debts, isFetching: totalsAreFetching } = useDebts(group?.id);
  const totalSpent: Record<
    string,
    Record<string, number>
  > = debts?.totalSpent ?? {};//group specific

  const groupTotalsByCurrency = getAllCurrencyTotals(totalSpent);//group specific
  const userTotalsByCurrency = getCurrencyValues(totalSpent, userMemberId);
  const shouldOpenMultiCurrencyTable =
    Object.keys(groupTotalsByCurrency).length > 1;

  useEffect(() => {
    const expenseFilters = localStorage.getItem(getFilterStorageKey("expense", group?.id));
    if (expenseFilters) {
      const paresedFilter = JSON.parse(expenseFilters);
      if (paresedFilter.groupId === group?.id || paresedFilter.groupId === "") {
        expenseParsedFilters.value = JSON.parse(expenseFilters);
      } else {
        localStorage.removeItem(getFilterStorageKey("expense", group?.id));
        queryClient.invalidateQueries({
          queryKey: ["groupExpenses"],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ["nonGroupExpenses"],
          exact: false,
        });
      }
    }
  }, []);

  useEffect(() => {
    isFetching && !isFetchingNextPage
      ? (showBottomBar.value = false)
      : (showBottomBar.value = true);
  }, [isFetching]);

  useEffect(() => {
    menu.value = errorMessage.value ? "error" : menu.value;
  }, [errorMessage.value]);

  if (isFetching && !isFetchingNextPage) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  const totalExpense = getGroupTotalByCurrency(
    totalSpent,
    group?.currency
  );//group specific

  const userExpense =
    transactionType === "Group"
      ? userMemberId && group?.currency
        ? totalSpent[userMemberId]?.[group?.currency] ?? 0
        : 0
      : totalSpent[userInfo?.userId]?.[userInfo?.currency] ?? 0;

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
        hasAnySearchParams ? (
          <div className="noFilteredData">
            <div className="pills">
              {renderExpenseFilterPills(
                expenseParsedFilters,
                allParticipants,
                group,
                queryClient
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
        )
      ) : (
        <>
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
                  transactionType === "Group"
                    ? "Group Total"
                    : transactionType === "NonGroup"
                      ? "Total"
                      : ""
                }
                bar2Legend="Your Share"
                bar1Total={totalExpense || 0}
                bar2Total={userExpense || 0}
                currency={
                  transactionType === "Group"
                    ? group?.currency
                    : userInfo?.currency
                }
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

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
