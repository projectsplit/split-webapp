import { useCallback, useEffect, useMemo } from 'react';
import { DateTime as LuxonDateTime } from 'luxon';
import { toLuxon, toUtcString } from '@/helpers/dateTimeAndRounding';
import { Signal, useComputed } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import {
  CreateTransferRequest,
  Member,
  Guest,
  UserInfo,
  Group,
} from '../../../types';
import { amountIsValid } from '../../../helpers/amountIsValid';
import { useCreateGroupTransfer } from '@/api/auth/CommandHooks/useCreateGroupTransfer';
import { useCreateNonGroupTransfer } from '@/api/auth/CommandHooks/useCreateNonGroupTransfer';

interface UseTransferFormLogicProps {
  userInfo: UserInfo | undefined;
  groupId: string | undefined;
  groupMembers: Signal<(Member | Guest)[]>;
  menu: Signal<string | null>;
  nonGroupMenu:
    | Signal<{
        attribute: string;
        menu: string | null;
        senderId: string;
        senderName: string;
        receiverId: string;
        receiverName: string;
      }>
    | undefined;
  fromHomeGroup: Signal<Group | null> | undefined;
  navigate: NavigateFunction;
  isSubmitting: Signal<boolean>;
  displayedAmount: Signal<string>;
  currencyMenu: Signal<string | null>;
  data: ReturnType<typeof import('./useTransferFormStore').useTransferData>;
  actions: ReturnType<
    typeof import('./useTransferFormStore').useTransferActions
  >;
  isNonGroup: boolean;
  showWarning: (message: string) => void;
}

export const useTransferFormLogic = ({
  userInfo,
  groupId,
  groupMembers,
  menu,
  nonGroupMenu,
  fromHomeGroup,
  navigate,
  isSubmitting,
  displayedAmount,
  currencyMenu,
  data,
  actions,
  isNonGroup,
  showWarning,
}: UseTransferFormLogicProps) => {
  const handleInputBlur = useCallback(() => {
    actions.setError('showAmountError', true);
    amountIsValid(
      data.amount,
      (err) => actions.setError('amountError', err),
      (val) => actions.setError('showAmountError', val)
    );
  }, [data.amount, actions]);

  const userMembers = groupMembers?.value.filter(
    (item): item is Member => 'userId' in item
  );

  const userMemberId = useMemo(
    () => userMembers?.find((m) => m.userId === userInfo?.userId)?.id,
    [userMembers, userInfo?.userId]
  );

  const { noReceiverSelected, isSamePerson } = useMemo(() => {
    return {
      noReceiverSelected: isNonGroup && nonGroupMenu?.value.receiverName === '',
      isSamePerson:
        isNonGroup &&
        nonGroupMenu?.value.senderId === nonGroupMenu?.value.receiverId,
    };
  }, [
    isNonGroup,
    nonGroupMenu?.value.senderId,
    nonGroupMenu?.value.receiverId,
    nonGroupMenu?.value.receiverName,
  ]);

  const {
    mutate: createGroupTransferMutation,
    isPending: isGroupTransferPending,
  } = useCreateGroupTransfer(
    menu,
    groupId,
    navigate,
    isSubmitting,
    fromHomeGroup,
    showWarning
  );

  const {
    mutate: createNonGroupTransferMutation,
    isPending: isNonGroupTransferPending,
  } = useCreateNonGroupTransfer(menu, navigate, isSubmitting, showWarning);

  const createTransferMutation = isNonGroup
    ? createNonGroupTransferMutation
    : createGroupTransferMutation;

  const isPendingCreateTransfer = isNonGroup
    ? isNonGroupTransferPending
    : isGroupTransferPending;

  const handleCurrencyOptionsClick = useCallback(
    (curr: string) => {
      actions.setCurrencySymbol(curr);
      currencyMenu.value = null;
      actions.setAmount('');
      displayedAmount.value = '';
    },
    [actions, currencyMenu, displayedAmount]
  );

  const submitTransfer = useCallback(() => {
    actions.setError('showAmountError', true);
    actions.setError('showIdError', true);

    if (isSamePerson) {
      actions.setError(
        'isSameUserError',
        'Sender and receiver cannot be the same person'
      );
      actions.setError('showSamePersonError', true);
    }

    if (
      !amountIsValid(
        data.amount,
        (err) => actions.setError('amountError', err),
        (val) => actions.setError('showAmountError', val)
      )
    )
      return;

    if (!!data.errors.idErrorMessage) return;

    const zone = userInfo?.timeZone;
    const now = LuxonDateTime.utc().setZone(zone);
    const occurredForSubmit =
      data.isTrackingNow && zone
        ? toUtcString(
            toLuxon(data.transferTime, zone).set({
              hour: now.hour,
              minute: now.minute,
              second: now.second,
            })
          )
        : data.transferTime;

    let createTransferRequest: CreateTransferRequest = {
      amount: Number(data.amount),
      groupId: groupId,
      currency: data.currencySymbol,
      receiverId: data.receiverId,
      senderId: data.senderId,
      occurred: occurredForSubmit,
      description: data.description,
    };

    createTransferMutation(createTransferRequest);
  }, [
    actions,
    noReceiverSelected,
    isSamePerson,
    data.amount,
    data.errors.idErrorMessage,
    data.currencySymbol,
    data.receiverId,
    data.senderId,
    data.transferTime,
    data.isTrackingNow,
    userInfo?.timeZone,
    data.description,
    groupId,
    createTransferMutation,
  ]);

  const sortedMembers = useComputed(() => {
    if (!!groupId) {
      return [...groupMembers.value].sort((a, b) =>
        a.id === userMemberId ? -1 : b.id === userMemberId ? 1 : 0
      );
    } else {
      return [...groupMembers.value].sort((a, b) =>
        a.id === userInfo?.userId ? -1 : b.id === userInfo?.userId ? 1 : 0
      );
    }
  });

  useEffect(() => {
    if (!isNonGroup) return;
    if (nonGroupMenu?.value.senderId) {
      actions.setSenderId(nonGroupMenu.value.senderId);
    }
    if (nonGroupMenu?.value.receiverId) {
      actions.setReceiverId(nonGroupMenu.value.receiverId);
    }
  }, [
    isNonGroup,
    nonGroupMenu?.value.senderId,
    nonGroupMenu?.value.receiverId,
    actions,
  ]);

  useEffect(() => {
    if (data.senderId === data.receiverId && data.senderId !== '') {
      actions.setError('isReceiverError', true);
      actions.setError('isSenderError', true);
      actions.setError(
        'idErrorMessage',
        'Sender and receiver cannot be the same person'
      );
    } else if (data.senderId === '' && data.receiverId !== '') {
      actions.setError('isReceiverError', false);
      actions.setError('isSenderError', true);
      actions.setError('idErrorMessage', 'Select a sender');
    } else if (data.receiverId === '' && data.senderId !== '') {
      actions.setError('isReceiverError', true);
      actions.setError('isSenderError', false);
      actions.setError('idErrorMessage', 'Select a receiver');
    } else if (data.receiverId === '' && data.senderId === '') {
      actions.setError('isReceiverError', true);
      actions.setError('isSenderError', true);
      actions.setError('idErrorMessage', 'Select a sender and a receiver');
    } else {
      actions.setError('isReceiverError', false);
      actions.setError('isSenderError', false);
      actions.setError('idErrorMessage', '');
    }
  }, [data.senderId, data.receiverId, isNonGroup, userInfo?.userId, actions]);

  const idError = useMemo(
    () => ({
      isSenderError: data.errors.isSenderError,
      isReceiverError: data.errors.isReceiverError,
      error: data.errors.idErrorMessage,
    }),
    [
      data.errors.isSenderError,
      data.errors.isReceiverError,
      data.errors.idErrorMessage,
    ]
  );

  return {
    handleInputBlur,
    handleCurrencyOptionsClick,
    submitTransfer,
    userMemberId,
    noReceiverSelected,
    isSamePerson,
    sortedMembers,
    idError,
    isPendingCreateTransfer,
  };
};
