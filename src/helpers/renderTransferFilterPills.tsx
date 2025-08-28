import { Signal } from "@preact/signals-react";
import Pill from "../components/Pill/Pill";
import { Group, TransferParsedFilters } from "../types";
import { QueryClient } from "@tanstack/react-query";

import { mergeMembersAndGuests } from "./mergeMembersAndGuests";

const updateFiltersAndSave = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  updatedFilters: any,
  queryClient: QueryClient
) => {
  transferParsedFilters.value = {
    ...transferParsedFilters.value,
    ...updatedFilters,
  };
  localStorage.setItem(
    "transferFilter",
    JSON.stringify(transferParsedFilters.value)
  );
  queryClient.invalidateQueries({ queryKey: ["groupTransfers"], exact: false });
};

export const renderTransferFilterPills = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  group: Group,
  queryClient: QueryClient
) => {
  const members = group?.members;
  const guests = group?.guests;
  const allParticipants = mergeMembersAndGuests(members || [], guests || []);

  const { freeText, before, after, sendersIds, receiversIds } =
    transferParsedFilters.value;
  const pills = [];
  if (freeText && freeText != "") {
    pills.push(
      <Pill
        key="before"
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
            queryClient
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
              queryClient
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
            queryClient
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
            queryClient
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
              queryClient
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
              queryClient
            )
          }
        />
      );
    });
  }

  return pills;
};
