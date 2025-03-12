import { useEffect, useRef, useState } from "react";
import Expense from "../../components/Expense/Expense";
import { DateTime } from "luxon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Group, UserInfo } from "../../types";
import { getGroupExpenses } from "../../api/services/api";
import { useOutletContext } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import useSentinel from "../../hooks/useSentinel";
import { StyledExpenses } from "./Expenses.styled";
import BarsWithLegends from "../../components/BarsWithLegends/BarsWithLegends";
import { CiReceipt } from "react-icons/ci";
import { Signal, useSignal } from "@preact/signals-react";
// import DetailedExpenseAnimation from "../../components/MenuAnimations/DetailedExpenseAnimation";
import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import DetailedExpense from "../../components/DetailedExpense/DetailedExpense";

const Expenses = () => {
  const timeZoneId = "Europe/Athens";
  const openDetailedExpense = useSignal<boolean>(false);

  const { userInfo, group, showBottomBar } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
  }>();

  const memberId = group?.members.find((x) => x.userId === userInfo?.userId)
    ?.id!;

  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groupExpenses", group?.id, pageSize],
      queryFn: ({ pageParam: next }) =>
        getGroupExpenses(group?.id!, pageSize, next),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });

  const expenses = data?.pages.flatMap((p) => p.expenses);

  useEffect(() => {
    !expenses ? (showBottomBar.value = false) : (showBottomBar.value = true);
  }, [expenses]);

  const sentinelRef = useRef(null);

  useSentinel(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (isFetching) {
    return <Spinner />;
  }

  const totalExpense = expenses?.reduce((sum, e) => sum + e.amount, 0);
  const userExpense = expenses?.reduce((sum, e) => {
    return sum + (e.shares.find((x) => x.memberId === memberId)?.amount ?? 0);
  }, 0);

  console.log(expenses);

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
            bar1Legend="Group"
            bar2Legend="Your Share"
            bar1Total={totalExpense || 0}
            bar2Total={userExpense || 0}
            currency="GBP"
            bar2Color="#e151ee"
            bar1Color="#5183ee"
          />
          {Object.entries(
            groupBy(expenses, (x) => DateOnly(x.occured, timeZoneId))
          ).map(([date, expenses]) => (
            <div key={date} className="same-date-container">
              <div className="date-only">{date}</div>
              <div className="expenses">
                {expenses.map((e) => (
                  <div className="expense" key={e.id}>
                    <Expense
                      amount={e.amount}
                      currency={e.currency}
                      occured={e.occured}
                      description={e.description}
                      location={e.location}
                      timeZoneId={timeZoneId}
                      onClick={() => (openDetailedExpense.value = true)}
                      userAmount={
                        e.shares.find((x) => x.memberId === memberId)?.amount ??
                        0
                      }
                    />
                    {openDetailedExpense.value ? (
                      <DetailedExpense
                        openDetailedExpense={openDetailedExpense}
                        amount={e.amount}
                        currency={e.currency}
                        description={e.description}
                        labels={e.labels}
                        location={e.location}
                        occured={e.occured}
                        payments={e.payments}
                        shares={e.shares}
                        timeZoneId={timeZoneId}
                        userAmount={
                          e.shares.find((x) => x.memberId === memberId)
                            ?.amount ?? 0
                        }
                        creator={e.creatorId}
                        created={e.created}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <div
        ref={sentinelRef}
        className="sentinel"
        style={{ height: "1px" }}
      ></div>
      {isFetchingNextPage && <Spinner />}
    </StyledExpenses>
  );
};

export default Expenses;

const DateOnly = (eventTimeUtc: string, timeZone: string): string => {
  const now = DateTime.now().setZone(timeZone);
  const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(
    timeZone
  );

  if (eventDateTime.hasSame(now, "day")) {
    return "Today";
  }

  if (eventDateTime.hasSame(now.minus({ days: 1 }), "day")) {
    return "Yesterday";
  }

  if (eventDateTime.hasSame(now, "year")) {
    return eventDateTime.setZone(timeZone).toFormat("d LLL");
  }

  return eventDateTime.setZone(timeZone).toFormat("d LLL yyyy");
};

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

// shareAmount:
// e.shares.find((x) => x.memberId === memberId)?.amount ??
// 0,
