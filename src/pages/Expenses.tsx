import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import Expense from "../components/Expense";
import { DateTime } from 'luxon';
import { useInfiniteQuery } from "@tanstack/react-query";

import { Group } from "../types";
import { getGroupExpenses } from "../api/services/api";

const Expenses: React.FC<ExpensesProps> = ({ group, memberId, timeZoneId }) => {

  const pageSize = 10

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['groupExpenses', group.id, pageSize],
    queryFn: ({ pageParam: next }) => getGroupExpenses(group.id!, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: '',
  });

  const expenses = data?.pages.flatMap(p => p.expenses)

  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!expenses) {
    return <div>....</div>
  }

  const expensesByDate = groupBy(expenses, x => DateOnly(x.occured, timeZoneId))

  return (
    <StyledExpenses>
      {Object.entries(expensesByDate).map(([date, expenses]) => (
        <div key={date} className="same-date-container">
          <div className="date-only">{date}</div>
          <div className="expenses">
            {expenses.map(e => (
              <Expense
                key={e.id}
                expense={{
                  amount: e.amount,
                  currency: e.currency,
                  date: e.occured,
                  description: e.description,
                  id: e.id,
                  location: e.location,
                  shareAmount: e.shares.find(x => x.memberId === memberId)?.amount ?? 0,
                  labels: e.labels
                }}
                timeZoneId={timeZoneId}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={sentinelRef} className="sentinel" style={{ height: "1px" }}></div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </StyledExpenses>
  );
};

export default Expenses;

const StyledExpenses = styled.div`
  min-width: 100%;
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  gap: 16px;
  
  .same-date-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    
    .date-only {
      background-color: ${({ theme }) => theme.backgroundColor};
      align-self: center;
      position: sticky;
      top: 0;
      font-size: 14px;
      margin: 0px 0px 1px 0px;
      padding: 0px 8px 0px 8px;
      border-radius: 4px;
      color: ${({ theme }) => theme.secondaryTextColor};
      font-weight: 600
    }
    
    .expenses {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;

interface ExpensesProps {
  group: Group;
  memberId: string;
  timeZoneId: string;
}

const DateOnly = (eventTimeUtc: string, timeZone: string): string => {

  const now = DateTime.now().setZone(timeZone);
  const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: 'utc' }).setZone(timeZone);

  if (eventDateTime.hasSame(now, "day")) {
    return "Today"
  }

  if (eventDateTime.hasSame(now.minus({ days: 1 }), "day")) {
    return "Yesterday"
  }

  if (eventDateTime.hasSame(now, "year")) {
    return eventDateTime.setZone(timeZone).toFormat('d LLL');
  }

  return eventDateTime.setZone(timeZone).toFormat('d LLL yyyy');
};

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
