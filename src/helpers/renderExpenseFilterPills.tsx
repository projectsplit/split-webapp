import { Signal } from '@preact/signals-react';
import {
  ExpenseParsedFilters,
  GetLabelsResponse,
  Group,
  Mode,
  TruncatedMember,
} from '../types';
import { QueryClient } from '@tanstack/react-query';
import { getFilterStorageKey } from '../components/SearchTransactions/helpers/localStorageStringParser';
import { MdGroup } from 'react-icons/md';
import Pill from '../components/Pill/Pill';
import { filterPill } from './filterPill';
import { labelChipInk, resolveLabelColor } from './labelChip';

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
  sessionStorage.setItem(
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
      filterPill(
        'freeTextExpense',
        `search term: ${freeText}`,
        () =>
          updateFiltersAndSave(
            expenseParsedFilters,
            { freeText: '' },
            queryClient,
            mode,
            group?.id
          )
      )
    );
  }

  if (before && after && before === after) {
    pills.push(
      filterPill(
        'during',
        `during: ${before}`,
        () =>
          updateFiltersAndSave(
            expenseParsedFilters,
            { before: null, after: null },
            queryClient,
            mode,
            group?.id
          )
      )
    );
  }

  if (before && before !== after) {
    pills.push(
      filterPill(
        'before',
        `before: ${before}`,
        () =>
          updateFiltersAndSave(
            expenseParsedFilters,
            { before: null },
            queryClient,
            mode,
            group?.id
          )
      )
    );
  }

  if (after && before !== after) {
    pills.push(
      filterPill(
        'after',
        `after: ${after}`,
        () =>
          updateFiltersAndSave(
            expenseParsedFilters,
            { after: null },
            queryClient,
            mode,
            group?.id
          )
      )
    );
  }

  if (participantsIds && participantsIds?.length > 0) {
    participantsIds?.forEach((id, index) => {
      const participant = allParticipants.find((p) => p.id === id);
      const participantName = participant?.name || id;
      pills.push(
        filterPill(
        `participant-${index}`,
        `participant: ${participantName}`,
        () =>
            updateFiltersAndSave(
              expenseParsedFilters,
              {
                participantsIds: participantsIds.filter((pid) => pid !== id),
              },
              queryClient,
              mode,
              group?.id
            )
      )
      );
    });
  }

  if (payersIds && payersIds?.length > 0) {
    payersIds?.forEach((id, index) => {
      const payer = allParticipants.find((p) => p.id === id);
      const payerName = payer?.name || id;
      pills.push(
        filterPill(
        `payer-${index}`,
        `payer: ${payerName}`,
        () =>
            updateFiltersAndSave(
              expenseParsedFilters,
              {
                payersIds: payersIds.filter((pid) => pid !== id),
              },
              queryClient,
              mode,
              group?.id
            )
      )
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
          color={resolveLabelColor(labelColor)}
          closeButton={true}
          fontSize="14px"
          $textColor={labelChipInk(resolveLabelColor(labelColor))}
          $border={false}
          $closeButtonColor={labelChipInk(resolveLabelColor(labelColor))}
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
