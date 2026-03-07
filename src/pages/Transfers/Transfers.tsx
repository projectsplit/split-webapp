import React, { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Transfer from "../../components/Transfer/Transfer";
import { Group, Mode, TransferParsedFilters, TransferResponseItem, UserInfo } from "../../types";
import { StyledTransfers } from "./Transfers.styled";
import { useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import { DateOnly } from "../../helpers/timeHelpers";
import DetailedTransfer from "../../components/DetailedTransfer/DetailedTransfer";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import ErrorMenuAnimation from "../../components/Animations/ErrorMenuAnimation";
import Sentinel from "../../components/Sentinel";
import Spinner from "../../components/Spinner/Spinner";
import GroupTotalsByCurrencyAnimation from "../../components/Animations/GroupTotalsByCurrencyAnimation";
import getAllTransfersParticipants from "@/helpers/getAllTransfersParticipants";
import { useGetAllNonGroupUsers } from "@/api/auth/QueryHooks/useGetAllNonGroupUsers";
import { useTransferList } from "./hooks/useTransferList";
import { groupBy } from "../../helpers/groupBy";
import { NoTransfersFound } from "./NoTransfersFound/NoTransfersFound";
import { FiltersAndBars } from "./FiltersAndBars/FiltersAndBars";
import { useTransferTotals } from "./hooks/useTransferTotals";

const Transfers: React.FC = () => {
  const pageSize = 10;
  const { userInfo, group, showBottomBar, transferParsedFilters, mode } = useOutletContext<{ userInfo: UserInfo; group: Group; showBottomBar: Signal<boolean>; transferParsedFilters: Signal<TransferParsedFilters>; mode: Mode; }>();
  const groupIsArchived = group?.isArchived;
  const errorMessage = useSignal<string>("");
  const menu = useSignal<string | null>(errorMessage.value ? "error" : null);
  const queryClient = useQueryClient();
  const timeZoneId = userInfo?.timeZone;
  const memberId = group?.members.find((x) => x.userId === userInfo?.userId)?.id;
  const selectedTransfer = useSignal<TransferResponseItem | null>(null);
  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, hasPreviousPage } = useTransferList(mode, group, transferParsedFilters, pageSize, timeZoneId);

  const { allUsers } = useGetAllNonGroupUsers(mode);
  const transfers = data?.pages.flatMap((p) => p.transfers);
  const allParticipants = getAllTransfersParticipants(transfers, mode, members, guests, allUsers.map((u) => ({
    id: u.userId,
    name: u.username,
  }))
  );

  useEffect(() => {
    if (isFetching && !isFetchingNextPage) {
      showBottomBar.value = false;
    } else {
      showBottomBar.value = true;
    }
  }, [isFetching, isFetchingNextPage, showBottomBar]);

  const { userTotalSentByCurr, userTotalReceivedByCurr, userConvertedTotalReceived, userConvertedTotalSent, totalsAreFetching } = useTransferTotals(group, mode, userInfo, transferParsedFilters);

  if (isFetching && !isFetchingNextPage) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <StyledTransfers>
      <div className="scroll-area" ref={scrollAreaRef}>
        {transfers && transfers.length > 0 && !hasPreviousPage &&
          <FiltersAndBars
            transferParsedFilters={transferParsedFilters}
            allParticipants={allParticipants}
            group={group}
            queryClient={queryClient}
            menu={menu}
            currency={userInfo?.currency}
            totalsAreFetching={totalsAreFetching}
            userConvertedTotalReceived={userConvertedTotalReceived}
            userConvertedTotalSent={userConvertedTotalSent}
          />
        }
        {!transfers || transfers.length === 0 ? (
          <NoTransfersFound
            transferParsedFilters={transferParsedFilters}
            allParticipants={allParticipants}
            group={group}
            queryClient={queryClient}
          />
        ) : (
          <>
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
                          t.senderId === memberId || t.senderId === userInfo?.userId
                            ? "You"
                            : allParticipants.find((x) => x.id === t.senderId)
                              ?.name ?? "",
                        receiverName:
                          t.receiverId === memberId || t.receiverId === userInfo?.userId
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
          fetchPage={fetchNextPage}
          hasMore={hasNextPage}
          isFetchingPage={isFetchingNextPage}
        />
      </div>
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
          userId={userInfo?.userId || ""}
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
        groupTotalsByCurrency={userTotalSentByCurr}
        userTotalsByCurrency={userTotalReceivedByCurr}
      />
    </StyledTransfers>
  );
};

export default Transfers;


