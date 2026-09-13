import { Signal } from '@preact/signals-react';
import { Group, TransferParsedFilters, TruncatedMember } from '../types';
import { QueryClient } from '@tanstack/react-query';
import { getFilterStorageKey } from '../components/SearchTransactions/helpers/localStorageStringParser';
import { filterPill } from './filterPill';

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
  sessionStorage.setItem(
    getFilterStorageKey('transfer', groupId),
    JSON.stringify(transferParsedFilters.value)
  );
  queryClient.invalidateQueries({ queryKey: ['groupTransfers'], exact: false });
  queryClient.invalidateQueries({
    queryKey: ['nonGroupTransfers'],
    exact: false,
  });
};

export const renderTransferFilterPills = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  allParticipants: TruncatedMember[],
  group: Group,
  queryClient: QueryClient
) => {
  const { freeText, before, after, sendersIds, receiversIds } =
    transferParsedFilters.value;

  const pills = [];
  if (freeText && freeText != '') {
    pills.push(
      filterPill(
        'freeText',
        `search term: ${freeText}`,
        () =>
          updateFiltersAndSave(
            transferParsedFilters,
            { freeText: '' },
            queryClient,
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
            transferParsedFilters,
            { before: null, after: null },
            queryClient,
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
            transferParsedFilters,
            { before: null },
            queryClient,
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
            transferParsedFilters,
            { after: null },
            queryClient,
            group?.id
          )
      )
    );
  }

  if (sendersIds && sendersIds?.length > 0) {
    sendersIds?.forEach((id, index) => {
      const participant = allParticipants.find((p) => p.id === id);
      const participantName = participant?.name || id;
      pills.push(
        filterPill(
        `sender-${index}`,
        `sender: ${participantName}`,
        () =>
            updateFiltersAndSave(
              transferParsedFilters,
              {
                sendersIds: sendersIds.filter((sid) => sid !== id),
              },
              queryClient,
              group?.id
            )
      )
      );
    });
  }

  if (receiversIds && receiversIds?.length > 0) {
    receiversIds?.forEach((id, index) => {
      const payer = allParticipants.find((p) => p.id === id);
      const payerName = payer?.name || id;
      pills.push(
        filterPill(
        `receiver-${index}`,
        `receiver: ${payerName}`,
        () =>
            updateFiltersAndSave(
              transferParsedFilters,
              {
                receiversIds: receiversIds.filter((rid) => rid !== id),
              },
              queryClient,
              group?.id
            )
      )
      );
    });
  }

  return pills;
};
