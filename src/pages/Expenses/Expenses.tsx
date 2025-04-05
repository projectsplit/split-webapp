import { useEffect, useRef } from "react";
import Expense from "../../components/Expense/Expense";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ExpenseResponseItem, Group, UserInfo } from "../../types";
import { getGroupExpenses } from "../../api/services/api";
import { useOutletContext } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { StyledExpenses } from "./Expenses.styled";
import BarsWithLegends from "../../components/BarsWithLegends/BarsWithLegends";
import { CiReceipt } from "react-icons/ci";
import { Signal, useSignal } from "@preact/signals-react";
import DetailedExpense from "../../components/DetailedExpense/DetailedExpense";
import { DateOnly } from "../../helpers/timeHelpers";
import { mergeMembersAndGuests } from "../../helpers/mergeMembersAndGuests";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import ErrorMenuAnimation from "../../components/Menus/MenuAnimations/ErrorMenuAnimation";
import Sentinel from "../../components/Sentinel";

const Expenses = () => {
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const errorMessage = useSignal<string>("");
  const menu = useSignal<string | null>(errorMessage.value ? "error" : null);

  const { userInfo, group, showBottomBar } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
  }>();
  const timeZoneId = userInfo?.timeZone;
  const pageSize = 10;
  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

  const allParticipants = mergeMembersAndGuests(members || [], guests || []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groupExpenses", group?.id, pageSize, errorMessage.value],
      queryFn: ({ pageParam: next }) =>
        getGroupExpenses(group?.id!, pageSize, next),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });

  const expenses = data?.pages.flatMap((p) => p.expenses);

  useEffect(() => {
    isFetching && !isFetchingNextPage
      ? (showBottomBar.value = false)
      : (showBottomBar.value = true);
  }, [isFetching]);

  useEffect(() => {
    menu.value = errorMessage.value ? "error" : menu.value;
  }, [errorMessage.value]);

  if (isFetching && !isFetchingNextPage) {
    return <Spinner />;
  }

  const totalExpense = expenses?.reduce((sum, e) => sum + e.amount, 0);
  const userExpense = expenses?.reduce((sum, e) => {
    return (
      sum + (e.shares.find((x) => x.memberId === userMemberId)?.amount ?? 0)
    );
  }, 0);

  return (
    <StyledExpenses>
      {!expenses || expenses.length === 0 ? (
        <div className="noData">
          <div className="msg">There are currently no expenses</div>
          <CiReceipt className="icon" />
        </div>
      ) : (
        <>
          <BarsWithLegends
            bar1Legend="Group Total"
            bar2Legend="Your Share"
            bar1Total={totalExpense || 0}
            bar2Total={userExpense || 0}
            currency={group.currency}
            bar2Color="#e151ee"
            bar1Color="#5183ee"
          />
          {Object.entries(
            groupBy(expenses, (x) => DateOnly(x.occurred, timeZoneId))
          ).map(([date, expenses]) => (
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
                      userAmount={
                        e.shares.find((x) => x.memberId === userMemberId)
                          ?.amount ?? 0
                      }
                      labels={e.labels}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <Sentinel
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
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
          creator={selectedExpense.value.creatorId}
          created={selectedExpense.value.created}
          members={allParticipants}
          errorMessage={errorMessage}
          userMemberId={userMemberId || ""}
          group={group}
        />
      )}

      <MenuAnimationBackground menu={menu} />
      <ErrorMenuAnimation
        menu={menu}
        message={errorMessage.value}
        type="expense"
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
