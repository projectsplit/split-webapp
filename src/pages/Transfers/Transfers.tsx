import React, { useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Transfer from "../../components/Transfer/Transfer";
import {
  Group,
  TransferParsedFilters,
  TransferResponseItem,
  UserInfo,
} from "../../types";
import { getGroupTransfers } from "../../api/services/api";
import { StyledTransfers } from "./Transfers.styled";
import { BiTransfer } from "react-icons/bi";
import BarsWithLegends from "../../components/BarsWithLegends/BarsWithLegends";
import { useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import { mergeMembersAndGuests } from "../../helpers/mergeMembersAndGuests";
import { DateOnly } from "../../helpers/timeHelpers";
import DetailedTransfer from "../../components/DetailedTransfer/DetailedTransfer";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import ErrorMenuAnimation from "../../components/Menus/MenuAnimations/ErrorMenuAnimation";
import Sentinel from "../../components/Sentinel";
import Spinner from "../../components/Spinner/Spinner";
import useDebts from "../../api/services/useDebts";
import { getCurrencyValues } from "../../helpers/getGroupTotalByCurrency";
import GroupTotalsByCurrencyAnimation from "../../components/Menus/MenuAnimations/GroupTotalsByCurrencyAnimation";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { renderTransferFilterPills } from "../../helpers/renderTransferFilterPills";

const Transfers: React.FC = () => {
  const pageSize = 10;

  const { userInfo, group, showBottomBar, transferParsedFilters } =
    useOutletContext<{
      userInfo: UserInfo;
      group: Group;
      showBottomBar: Signal<boolean>;
      transferParsedFilters: Signal<TransferParsedFilters>;
    }>();

  const errorMessage = useSignal<string>("");
  const menu = useSignal<string | null>(errorMessage.value ? "error" : null);
  const queryClient = useQueryClient();

  const timeZoneId = userInfo?.timeZone;
  const memberId = group?.members.find((x) => x.userId === userInfo?.userId)
    ?.id!;
  const selectedTransfer = useSignal<TransferResponseItem | null>(null);
  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
  const allParticipants = mergeMembersAndGuests(members || [], guests || []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [
        "groupTransfers",
        group?.id,
        pageSize,
        transferParsedFilters.value,
        timeZoneId,
      ],
      queryFn: ({ pageParam: next }) =>
        getGroupTransfers(
          group?.id!,
          pageSize,
          transferParsedFilters.value,
          next
        ),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
      enabled: !!group,
    });

  const transfers = data?.pages.flatMap((p) => p.transfers);

  useEffect(() => {
    const transferilters = localStorage.getItem("transferFilter");
    if (transferilters) {
      const paresedFilter = JSON.parse(transferilters);
      if (paresedFilter.groupId === group.id) {
        transferParsedFilters.value = JSON.parse(transferilters);
      } else {
        localStorage.removeItem("transferFilter");
        queryClient.invalidateQueries({
          queryKey: ["groupTransfers"],
          exact: false,
        });
      }
    }
  }, []);

  const groupIsArchived = group.isArchived;
  useEffect(() => {
    isFetching && !isFetchingNextPage
      ? (showBottomBar.value = false)
      : (showBottomBar.value = true);
  }, [isFetching]);

  const { data: debts, isFetching: totalsAreFetching } = useDebts(group.id);

  const groupTotalReceived: Record<
    string,
    Record<string, number>
  > = debts?.totalReceived ?? {};
  const groupTotalSent: Record<
    string,
    Record<string, number>
  > = debts?.totalSent ?? {};

  const userTotalSent = getCurrencyValues(groupTotalSent, userMemberId);
  const userTotalReceived = getCurrencyValues(groupTotalReceived, userMemberId);

  const shouldOpenMultiCurrencyTable =
    Object.keys(groupTotalReceived).length > 1 ||
    Object.keys(groupTotalSent).length > 1;

  const usertotalReceived =
    userMemberId && group.currency
      ? groupTotalReceived[userMemberId]?.[group.currency] ?? 0
      : 0;
  const usertotalSent =
    userMemberId && group.currency
      ? groupTotalSent[userMemberId]?.[group.currency] ?? 0
      : 0;

  if (isFetching && !isFetchingNextPage) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  const hasAnySearchParams =
    (transferParsedFilters.value.before !== null &&
      transferParsedFilters.value.before !== undefined) ||
    (transferParsedFilters.value.after !== null &&
      transferParsedFilters.value.after !== undefined) ||
    (transferParsedFilters.value.freeText !== "" &&
      transferParsedFilters.value.freeText !== undefined) ||
    (transferParsedFilters.value.sendersIds !== undefined &&
      transferParsedFilters.value.sendersIds.length > 0) ||
    (transferParsedFilters.value.receiversIds !== undefined &&
      transferParsedFilters.value.receiversIds.length > 0);

  return (
    <StyledTransfers>
      {!transfers || transfers.length === 0 ? (
        hasAnySearchParams ? (
          <div className="noFilteredData">
            <div className="pills">
              {" "}
              {renderTransferFilterPills(
                transferParsedFilters,
                group,
                queryClient
              )}
            </div>
            <div className="textAndIcon">
              <span className="text">
                No transfers found. Have a go and refine your search!{" "}
              </span>
              <span className="emoji">🧐</span>
              <FaMagnifyingGlass className="icon" />
            </div>
            <div />
          </div>
        ) : (
          <div className="noData">
            <div className="msg">There are currently no transfers</div>
            <BiTransfer className="icon" />
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
                {" "}
                {renderTransferFilterPills(
                  transferParsedFilters,
                  group,
                  queryClient
                )}
              </div>
              <BarsWithLegends
                bar1Legend="Total Sent"
                bar2Legend="Total Received"
                bar1Total={usertotalSent || 0}
                bar2Total={usertotalReceived || 0}
                currency={group.currency}
                bar1Color="#0CA0A0"
                bar2Color="#D79244"
                onClick={() => {
                  if (shouldOpenMultiCurrencyTable) {
                    menu.value = "epensesByCurrency";
                  } else null;
                }}
              />
            </div>
          )}
          {Object.entries(
            groupBy(transfers, (x) => DateOnly(x.occurred, timeZoneId))
          ).map(([date, transfers]) => (
            <div key={date} className="same-date-container">
              <div className="date-only">{date}</div>
              <div className="transfers">
                {transfers.map((t) => (
                  <Transfer
                    onClick={() => (selectedTransfer.value = t)}
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
      <Sentinel
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {selectedTransfer.value && (
        <DetailedTransfer
          selectedTransfer={selectedTransfer}
          amount={selectedTransfer.value.amount}
          created={selectedTransfer.value.created}
          creator={selectedTransfer.value.creatorId}
          currency={selectedTransfer.value.currency}
          occurred={selectedTransfer.value.occurred}
          timeZoneId={timeZoneId}
          errorMessage={errorMessage}
          userMemberId={userMemberId || ""}
          members={allParticipants}
          groupIsArchived={groupIsArchived}
        />
      )}
      <MenuAnimationBackground menu={menu} />
      <ErrorMenuAnimation
        menu={menu}
        message={errorMessage.value}
        type="transfer"
      />
      <GroupTotalsByCurrencyAnimation
        menu={menu}
        bar1Legend="You Sent"
        bar2Legend="You Received"
        bar1Color="#0CA0A0"
        bar2Color="#D79244"
        groupTotalsByCurrency={userTotalSent}
        userTotalsByCurrency={userTotalReceived}
      />
    </StyledTransfers>
  );
};

export default Transfers;

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
