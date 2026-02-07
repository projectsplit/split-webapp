import { Signal } from "@preact/signals-react";
import Pill from "../components/Pill/Pill";
import { Group, TransferParsedFilters, TruncatedMember } from "../types";
import { QueryClient } from "@tanstack/react-query";
import { getFilterStorageKey } from "../components/SearchTransactions/helpers/localStorageStringParser";

const updateFiltersAndSave = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  updatedFilters: any,
  queryClient: QueryClient,
  groupId?: string
) => {
  transferParsedFilters.value = {
    ...transferParsedFilters.value,
    ...updatedFilters,
  };
  localStorage.setItem(
    getFilterStorageKey("transfer", groupId),
    JSON.stringify(transferParsedFilters.value)
  );
  queryClient.invalidateQueries({ queryKey: ["groupTransfers"], exact: false });
  queryClient.invalidateQueries({ queryKey: ["nonGroupTransfers"], exact: false });
};

export const renderTransferFilterPills = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  allParticipants: TruncatedMember[],
  group: Group,
  queryClient: QueryClient
) => {

  const { freeText, before, after, sendersIds, receiversIds } = transferParsedFilters.value;

  const pills = [];
  if (freeText && freeText != "") {
    pills.push(
      <Pill
        key="freeText"
        title={`search term: ${freeText}`}
        color="#e0e0e0"
        closeButton={true}
        fontSize="14px"
        $textColor="black"
        $border={false}
        $closeButtonColor="black"
        onClose={() =>
          updateFiltersAndSave(
            transferParsedFilters,
            { freeText: "" },
            queryClient,
            group?.id
          )
        }
      />
    );
  }
  if (before && after && before === after) {
    pills.push(
      <Pill
        key="during"
        title={`during: ${before}`}
        color="#e0e0e0"
        closeButton={true}
        fontSize="14px"
        $textColor="black"
        $border={false}
        $closeButtonColor="black"
        onClose={() =>
          updateFiltersAndSave(
            transferParsedFilters,
            { before: null, after: null },
            queryClient,
            group?.id
          )
        }
      />
    );
  }
  // Handle before
  if (before && before !== after) {
    pills.push(
      <Pill
        key="before"
        title={`before: ${before}`}
        color="#e0e0e0"
        closeButton={true}
        fontSize="14px"
        $textColor="black"
        $border={false}
        $closeButtonColor="black"
        onClose={() =>
          updateFiltersAndSave(
            transferParsedFilters,
            { before: null },
            queryClient,
            group?.id
          )
        }
      />
    );
  }

  // Handle after
  if (after && before !== after) {
    pills.push(
      <Pill
        key="after"
        title={`after: ${after}`}
        color="#e0e0e0"
        closeButton={true}
        fontSize="14px"
        $textColor="black"
        $border={false}
        $closeButtonColor="black"
        onClose={() =>
          updateFiltersAndSave(
            transferParsedFilters,
            { after: null },
            queryClient,
            group?.id
          )
        }
      />
    );
  }

  // Handle participantsIds
  if (sendersIds && sendersIds?.length > 0) {
    sendersIds?.forEach((id, index) => {
      const participant = allParticipants.find((p) => p.id === id);
      const participantName = participant?.name || id;
      pills.push(
        <Pill
          key={`sender-${index}`}
          title={`sender: ${participantName}`}
          color="#e0e0e0"
          closeButton={true}
          fontSize="14px"
          $textColor="black"
          $border={false}
          $closeButtonColor="black"
          onClose={() =>
            updateFiltersAndSave(
              transferParsedFilters,
              {
                sendersIds: sendersIds.filter((sid) => sid !== id),
              },
              queryClient,
              group?.id
            )
          }
        />
      );
    });
  }

  // Handle payersIds
  if (receiversIds && receiversIds?.length > 0) {
    receiversIds?.forEach((id, index) => {
      const payer = allParticipants.find((p) => p.id === id);
      const payerName = payer?.name || id;
      pills.push(
        <Pill
          key={`receiver-${index}`}
          title={`receiver: ${payerName}`}
          color="#e0e0e0"
          closeButton={true}
          fontSize="14px"
          $textColor="black"
          $border={false}
          $closeButtonColor="black"
          onClose={() =>
            updateFiltersAndSave(
              transferParsedFilters,
              {
                receiversIds: receiversIds.filter((rid) => rid !== id),
              },
              queryClient,
              group?.id
            )
          }
        />
      );
    });
  }

  return pills;
};
