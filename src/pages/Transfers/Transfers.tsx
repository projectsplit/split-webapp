import React, { useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { useInfiniteQuery } from "@tanstack/react-query";
import Transfer from "../../components/Transfer/Transfer";
import { Group, UserInfo } from "../../types";
import { getGroupTransfers } from "../../api/services/api";
import { StyledTransfers } from "./Transfers.styled";
import Spinner from "../../components/Spinner/Spinner";
import useSentinel from "../../hooks/useSentinel";
import { BiTransfer } from "react-icons/bi";
import BarsWithLegends from "../../components/BarsWithLegends/BarsWithLegends";
import { useOutletContext } from "react-router-dom";
import { Signal } from "@preact/signals-react";
import { mergeMembersAndGuests } from "../../helpers/mergeMembersAndGuests";
import { DateOnly } from "../../helpers/timeHelpers";

const Transfers: React.FC = () => {
  const pageSize = 10;

  const { userInfo, group, showBottomBar } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
  }>();
  const timeZoneId = userInfo?.timeZone;
  const memberId = group?.members.find((x) => x.userId === userInfo?.userId)
    ?.id!;

  const members = group?.members;
  const guests = group?.guests;
  const allParticipants = mergeMembersAndGuests(members || [], guests || []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groupTransfers", group?.id, pageSize],
      queryFn: ({ pageParam: next }) =>
        getGroupTransfers(group?.id!, pageSize, next),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
      enabled: !!group,
    });

  const transfers = data?.pages.flatMap((p) => p.transfers);

  useEffect(() => {
    isFetching ? (showBottomBar.value = false) : (showBottomBar.value = true);
  }, [isFetching]);

  const sentinelRef = useRef(null);

  useSentinel(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (isFetching) {
    return <Spinner />;
  }

  const totalSent = transfers?.reduce((sum, t) => {
    return sum + (t.senderId === memberId ? t.amount : 0);
  }, 0);
  const totalReceived = transfers?.reduce((sum, t) => {
    return sum + (t.receiverId === memberId ? t.amount : 0);
  }, 0);

  return (
    <StyledTransfers>
      {!transfers || transfers.length === 0 ? (
        <div className="noData">
          <div className="msg">There are currently no transfers</div>
          <BiTransfer className="icon" />
        </div>
      ) : (
        <>
          <BarsWithLegends
            bar1Legend="You Sent"
            bar2Legend="You Received"
            bar1Total={totalSent || 0}
            bar2Total={totalReceived || 0}
            currency="GBP"
            bar1Color="#0CA0A0"
            bar2Color="#D79244"
          />
          {Object.entries(
            groupBy(transfers, (x) => DateOnly(x.occurred, timeZoneId))
          ).map(([date, transfers]) => (
            <div key={date} className="same-date-container">
              <div className="date-only">{date}</div>
              <div className="transfers">
                {transfers.map((t) => (
                  <Transfer
                    key={t.id}
                    transfer={{
                      amount: t.amount,
                      currency: t.currency,
                      date: t.occurred,
                      description: t.description,
                      id: t.id,
                      senderName:
                        t.senderId === memberId
                          ? "You"
                          : allParticipants.find((x) => x.id === t.senderId)
                              ?.name ?? "",
                      receiverName:
                        t.receiverId === memberId
                          ? "You"
                          : allParticipants.find((x) => x.id === t.receiverId)
                              ?.name ?? "",
                    }}
                    timeZoneId={timeZoneId}
                  />
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
    </StyledTransfers>
  );
};

export default Transfers;

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
