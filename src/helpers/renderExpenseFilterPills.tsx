import { Signal } from '@preact/signals-react';
import Pill from '../components/Pill/Pill';
import {
  ExpenseParsedFilters,
  GetLabelsResponse,
  Group,
  Mode,
  TruncatedMember,
} from '../types';
import { QueryClient } from '@tanstack/react-query';
import labelColors from '../labelColors';
import { getFilterStorageKey } from '../components/SearchTransactions/helpers/localStorageStringParser';
import { MdGroup } from 'react-icons/md';

const updateFiltersAndSave = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  updatedFilters: any,
  queryClient: QueryClient,
  mode: Mode,
  groupId?: string
) => {
  expenseParsedFilters.value = {
    ...expenseParsedFilters.value,
    ...updatedFilters,
  };
  localStorage.setItem(
    getFilterStorageKey('expense', groupId, mode === Mode.Personal),
    JSON.stringify(expenseParsedFilters.value)
  );
  queryClient.invalidateQueries({ queryKey: ['groupExpenses'], exact: false });
  queryClient.invalidateQueries({
    queryKey: ['nonGroupExpenses'],
    exact: false,
  });
  queryClient.invalidateQueries({
    queryKey: ['personalExpenses'],
    exact: false,
  });
};

export const renderExpenseFilterPills = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  allParticipants: TruncatedMember[],
  group: Group | null,
  queryClient: QueryClient,
  mode: Mode,
  fetchedUserAndGroupLabels: GetLabelsResponse | undefined
) => {
  const { freeText, before, after, participantsIds, payersIds, labels } =
    expenseParsedFilters.value;

  const pills = [];

  if (freeText && freeText != '') {
    pills.push(
      <Pill
        key="freeTextExpense"
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
            { freeText: '' },
            queryClient,
            mode,
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
            expenseParsedFilters,
            { before: null, after: null },
            queryClient,
            mode,
            group?.id
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
            queryClient,
            mode,
            group?.id
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
            queryClient,
            mode,
            group?.id
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
              queryClient,
              mode,
              group?.id
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
              queryClient,
              mode,
              group?.id
            )
          }
        />
      );
    });
  }

  if (labels && labels?.length > 0) {
    labels?.forEach((id, index) => {
      const label = fetchedUserAndGroupLabels?.labels?.find((l) => l.id === id);
      const labelTitle = label?.text;
      const labelColor = label?.color;

      pills.push(
        <Pill
          key={`label-${index}`}
          title={`${labelTitle}`}
          color={labelColors[labelColor || '#e0e0e0']}
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
              queryClient,
              mode,
              group?.id
            )
          }
        >
          {mode === Mode.Personal && !id.includes('_') && (
            <MdGroup style={{ marginRight: '4px' }} />
          )}
        </Pill>
      );
    });
  }

  return pills;
};
