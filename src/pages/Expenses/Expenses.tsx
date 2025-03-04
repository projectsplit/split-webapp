import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import Expense from "../../components/Expense/Expense";
import { DateTime } from "luxon";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Group, UserInfo } from "../../types";
import { getGroup, getGroupExpenses } from "../../api/services/api";
import { useOutletContext, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import useSentinel from "../../hooks/useSentinel";
import { StyledExpenses } from "./Expenses.styled";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import BarsWithLegends from "../../components/BarsWithLegends/BarsWithLegends";

const Expenses = () => {
  const timeZoneId = "Europe/Athens";
  const params = useParams();

  const groupId = params?.groupid;
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();

  const { data: group, isSuccess } = useQuery({
    queryKey: [groupId],
    queryFn: () =>
      groupId ? getGroup(groupId) : Promise.reject("No group ID"),
    enabled: !!groupId, // Prevents the query from running if groupId is undefined
  });

  const memberId = group?.members.find((x) => x.userId === userInfo?.userId)
    ?.id!;

  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["groupExpenses", group?.id, pageSize],
      queryFn: ({ pageParam: next }) =>
        getGroupExpenses(group?.id!, pageSize, next),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });

  const expenses = data?.pages.flatMap((p) => p.expenses);
  console.log(expenses)
  const sentinelRef = useRef(null);

  useSentinel(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (!expenses) {
    return <Spinner/>;
  }

  const expensesByDate = groupBy(expenses, (x) =>
    DateOnly(x.occured, timeZoneId)
  );

  const totalExpense = expenses.reduce((sum,e)=>sum+e.amount,0);
  const userExpense = expenses.reduce((sum, e) => {
    return sum + (e.shares.find((x) => x.memberId === memberId)?.amount ?? 0);
  }, 0);

  return (
    <StyledExpenses>

      <BarsWithLegends
        bar1Legend="Group "
        bar2Legend="Your Total"
        bar1Total={totalExpense}
        bar2Total={userExpense}
        currency="GBP"
      />
      {Object.entries(expensesByDate).map(([date, expenses]) => (
        <div key={date} className="same-date-container">
          <div className="date-only">{date}</div>
          <div className="expenses">
            {expenses.map((e) => (
              <Expense
                key={e.id}
                expense={{
                  amount: e.amount,
                  currency: e.currency,
                  date: e.occured,
                  description: e.description,
                  id: e.id,
                  location: e.location,
                  shareAmount:
                  e.shares.find((x) => x.memberId === memberId)?.amount ?? 0,
                  labels: e.labels,
                }}
                timeZoneId={timeZoneId}
              />
            ))}
          </div>
        </div>
      ))}
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
