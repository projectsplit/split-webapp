import { useEffect, useLayoutEffect, useRef } from "react";
import Expense from "../../components/Expense/Expense";
import { useQueryClient } from "@tanstack/react-query";
import { ExpenseParsedFilters, ExpenseResponseItem, Group, UserInfo, Mode } from "../../types";
import { useOutletContext, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const jumpToken = searchParams.get("jumpTo") || "";
  const jumpToProcessed = useRef<string | null>(null);

  // Scroll anchor refs — used to restore scroll position after prepending items
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const savedScrollHeight = useRef<number>(0);

  const { userInfo, group, showBottomBar, expenseParsedFilters, mode,
  } = useOutletContext<{
    userInfo: UserInfo; group: Group; showBottomBar: Signal<boolean>;
    expenseParsedFilters: Signal<ExpenseParsedFilters>; mode: Mode;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const pageSize = 10;
  const userMemberId = group?.members?.find((m) => m.userId === userInfo?.userId)?.id;//group specific

  const { data, fetchNextPage, hasNextPage, fetchPreviousPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage, isFetching
  } = useExpenseList(mode, group, expenseParsedFilters, pageSize, timeZoneId, jumpToken);
  const { allUsers } = useGetAllNonGroupUsers(mode);

  // Deduplicate expenses by id to avoid React key conflicts when pages overlap
  const rawExpenses = data?.pages.flatMap((p) => p.expenses);
  const expenses = rawExpenses
    ? Array.from(new Map(rawExpenses.map((e) => [e.id, e])).values())
    : undefined;

  const allParticipants =
    mode === Mode.Personal ? [] : getAllExpenseParticipants(expenses, mode, group?.members || [], group?.guests || [],
      allUsers.map((u) => ({
        id: u.userId,
        name: u.username,
      }))
    );

  //TODO: add condition to exlcude if mode is Personal as different endpoint will be used.
  const { groupTotalsByCurrency, userTotalsByCurrency, totalExpense, userExpense, shouldOpenMultiCurrencyTable, totalsAreFetching } =
    useExpenseTotals(group, mode, userInfo, userMemberId, expenseParsedFilters);


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

  // Before fetching the previous page, save the current scrollHeight so we can
  // restore the visual position after new items are prepended to the list.
  useEffect(() => {
    if (isFetchingPreviousPage && scrollAreaRef.current) {
      savedScrollHeight.current = scrollAreaRef.current.scrollHeight;
    }
  }, [isFetchingPreviousPage]);

  // After the previous page has been fetched and the DOM has updated, adjust
  // scrollTop so the user's viewport position appears unchanged.
  useLayoutEffect(() => {
    if (!isFetchingPreviousPage && savedScrollHeight.current > 0 && scrollAreaRef.current) {
      const newScrollHeight = scrollAreaRef.current.scrollHeight;
      scrollAreaRef.current.scrollTop += newScrollHeight - savedScrollHeight.current;
      savedScrollHeight.current = 0;
    }
  }, [isFetchingPreviousPage, expenses?.length]);

  useLayoutEffect(() => {
    if (jumpToken && jumpToken !== jumpToProcessed.current && expenses && expenses.length > 0) {
      try {
        const tokenStr = atob(jumpToken);
        const parsedToken = JSON.parse(tokenStr);
        const targetOccurred = parsedToken.Occurred;
        const targetCreated = parsedToken.Created;

        const targetExpense = expenses.find(
          (e) => e.occurred === targetOccurred && e.created === targetCreated
        );

        if (targetExpense) {
          const element = document.getElementById(`expense-${targetExpense.id}`);
          if (element) {
            element.scrollIntoView({ block: "center" });
            jumpToProcessed.current = jumpToken;
          }
        }
      } catch (e) {
        console.error("Failed to parse jump token", e);
      }
    }
  }, [jumpToken, expenses]);

  if (isFetching && !isFetchingNextPage && !isFetchingPreviousPage) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  const getUserAmount = (e: ExpenseResponseItem) => {
    if (isGroupExpense(e)) {
      return e.shares?.find((x) => x.memberId === userMemberId)?.amount ?? 0;
    }
    if (isNonGroupExpense(e)) {
      return e.shares?.find((x) => x.userId === userInfo?.userId)?.amount ?? 0;
    }
    return e.amount;
  };

  return (
    <StyledExpenses>
      {/* --- STATIC HEADER: Stays at the top --- */}
      {expenses && expenses.length > 0 && (
        <FiltersAndBars
          expenseParsedFilters={expenseParsedFilters}
          allParticipants={allParticipants}
          group={group}
          queryClient={queryClient}
          mode={mode}
          menu={menu}
          totalsAreFetching={totalsAreFetching}
          totalExpense={totalExpense}
          userExpense={userExpense}
          currency={group?.currency || userInfo?.currency}
          shouldOpenMultiCurrencyTable={shouldOpenMultiCurrencyTable}
        />
      )}

      {/* --- SCROLLABLE AREA: Only this part scrolls --- */}
      <div className="scroll-area" ref={scrollAreaRef}>
        {!expenses || expenses.length === 0 ? (
          <NoExpensesFound
            expenseParsedFilters={expenseParsedFilters}
            allParticipants={allParticipants}
            group={group}
            queryClient={queryClient}
          />
        ) : (
          <>
           <Sentinel
            fetchPage={() => fetchPreviousPage()}
            hasMore={hasPreviousPage}
            isFetchingPage={isFetchingPreviousPage}
            id="sentinel-top"
            isTop={true}
          />
            {Object.entries(
              groupBy(expenses, (x) => DateOnly(x.occurred, timeZoneId))
            ).map(([date, items]) => (
              <div key={date} className="same-date-container">
                <div className="date-only">{date}</div>
                <div className="expenses">
                  {items.map((e) => (
                    <div className="expense" key={e.id} id={`expense-${e.id}`}>
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
                        mode={mode}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Sentinel
              fetchPage={fetchNextPage}
              hasMore={hasNextPage}
              isFetchingPage={isFetchingNextPage}
            />
          </>
        )}
      </div>

      {/* --- OVERLAYS: Modals and Backgrounds --- */}
      {selectedExpense.value && (
        <DetailedExpense
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
          mode={mode}
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

