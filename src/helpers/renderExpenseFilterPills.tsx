import { Signal } from "@preact/signals-react";
import Pill from "../components/Pill/Pill";
import { ExpenseParsedFilters, Group } from "../types";
import { QueryClient } from "@tanstack/react-query";
import labelColors from "../labelColors";
import { mergeMembersAndGuests } from "./mergeMembersAndGuests";

const updateFiltersAndSave = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  updatedFilters: any,
  queryClient: QueryClient
) => {
  expenseParsedFilters.value = {
    ...expenseParsedFilters.value,
    ...updatedFilters,
  };
  localStorage.setItem(
    "expenseFilter",
    JSON.stringify(expenseParsedFilters.value)
  );
  queryClient.invalidateQueries({ queryKey: ["groupExpenses"], exact: false });
};

export const renderExpenseFilterPills = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  group: Group,
  queryClient: QueryClient
) => {
  const members = group?.members;
  const guests = group?.guests;
  const allParticipants = mergeMembersAndGuests(members || [], guests || []);

  const { freeText, before, after, participantsIds, payersIds, labels } =
    expenseParsedFilters.value;
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
            expenseParsedFilters,
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
            expenseParsedFilters,
            { before: null, after: null },
            queryClient
          )
        }
      />
    );
  }

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
            expenseParsedFilters,
            { before: null },
            queryClient
          )
        }
      />
    );
  }


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
            expenseParsedFilters,
            { after: null },
            queryClient
          )
        }
      />
    );
  }


  if (participantsIds && participantsIds?.length > 0) {
    participantsIds?.forEach((id, index) => {
      const participant = allParticipants.find((p) => p.id === id);
      const participantName = participant?.name || id;
      pills.push(
        <Pill
          key={`participant-${index}`}
          title={`participant: ${participantName}`}
          color="#e0e0e0"
          closeButton={true}
          fontSize="14px"
          $textColor="black"
          $border={false}
          $closeButtonColor="black"
          onClose={() =>
            updateFiltersAndSave(
              expenseParsedFilters,
              {
                participantsIds: participantsIds.filter((pid) => pid !== id),
              },
              queryClient
            )
          }
        />
      );
    });
  }


  if (payersIds && payersIds?.length > 0) {
    payersIds?.forEach((id, index) => {
      const payer = allParticipants.find((p) => p.id === id);
      const payerName = payer?.name || id;
      pills.push(
        <Pill
          key={`payer-${index}`}
          title={`payer: ${payerName}`}
          color="#e0e0e0"
          closeButton={true}
          fontSize="14px"
          $textColor="black"
          $border={false}
          $closeButtonColor="black"
          onClose={() =>
            updateFiltersAndSave(
              expenseParsedFilters,
              {
                payersIds: payersIds.filter((pid) => pid !== id),
              },
              queryClient
            )
          }
        />
      );
    });
  }


  if (labels && labels?.length > 0) {
    labels?.forEach((id, index) => {
      const label = group.labels.find((l) => l.id === id);
      const labelTitle = label?.text;
      const labelColor = label?.color;

      pills.push(
        <Pill
          key={`label-${index}`}
          title={`label: ${labelTitle}`}
          color={labelColors[labelColor || "#e0e0e0"]}
          closeButton={true}
          fontSize="14px"
          $textColor="black"
          $border={false}
          $closeButtonColor="black"
          onClose={() =>
            updateFiltersAndSave(
              expenseParsedFilters,
              {
                labels: labels.filter((lid) => lid !== id),
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
