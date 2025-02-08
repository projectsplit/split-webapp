import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { DateTime } from 'luxon';
import { useInfiniteQuery } from "@tanstack/react-query";
import { getGroupTransfers } from "../api/api";
import Transfer from "../components/Transfer";
import { Group } from "../types";

const Transfers: React.FC<TransfersProps> = ({ group, memberId, timeZoneId }) => {

  const pageSize = 10

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['groupTransfers', group?.id, pageSize],
    queryFn: ({ pageParam: next }) => getGroupTransfers(group.id!, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: '',
  });

  const transfers = data?.pages.flatMap(p => p.transfers)

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

  if (!transfers) {
    return <div>....</div>
  }

  const expensesByDate = groupBy(transfers, x => DateOnly(x.occured, timeZoneId))

  return (
    <StyledTransfers>
      {Object.entries(expensesByDate).map(([date, expenses]) => (
        <div key={date} className="same-date-container">
          <div className="date-only">{date}</div>
          <div className="transfers">
            {expenses.map(t => (
              <Transfer
                key={t.id}
                transfer={{
                  amount: t.amount,
                  currency: t.currency,
                  date: t.occured,
                  description: t.description,
                  id: t.id,
                  senderName: t.senderId === memberId ? 'You' : group.members.find(x => x.id === t.senderId)?.name ?? '',
                  receiverName: t.receiverId === memberId ? 'You' : group.members.find(x => x.id === t.receiverId)?.name ?? '',
                }}
                timeZoneId={timeZoneId}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={sentinelRef} className="sentinel" style={{ height: "1px" }}></div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </StyledTransfers>
  );
};

export default Transfers;

const StyledTransfers = styled.div`
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
    
    .transfers {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;

interface TransfersProps {
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
