import { SelectedGroup } from '@/components/Menus/NonGroupUsersMenus/SelectionLists/SelectedGroup';
import SendMenuWrapper from '../SendMenuWrapper/SendMenuWrapper';
import { StyledGroupMenu, StyledMemberSheet } from './GroupMenu.styled';
import { ReadonlySignal, Signal } from '@preact/signals-react';
import { Group, Guest, Member } from '@/types';
import { TransferState } from '../formStore/formStoreTypes';
import { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import { getInitials } from '@/helpers/getInitials';

interface GroupMenuProps {
  fromHomeGroup: Signal<Group | null> | undefined;
  idError: {
    isSenderError: boolean;
    isReceiverError: boolean;
    error: string;
  };
  data: Pick<TransferState, 'senderId' | 'receiverId' | 'errors'>;
  actions: Pick<
    TransferState,
    'toggleSenderId' | 'toggleReceiverId' | 'swapParties' | 'setError'
  >;
  userMemberId: string | undefined;
  sortedMembers: ReadonlySignal<(Member | Guest)[]>;
}

export const GroupMenu = ({
  fromHomeGroup,
  idError,
  data,
  actions,
  userMemberId,
  sortedMembers,
}: GroupMenuProps) => {
  const [picking, setPicking] = useState<'sender' | 'receiver' | null>(null);

  const errorCondition =
    (idError.isSenderError || idError.isReceiverError) &&
    data.errors.showIdError;

  const pickedId = picking === 'sender' ? data.senderId : data.receiverId;

  const canSwap = !!data.senderId && !!data.receiverId;

  const swap = () => {
    if (!canSwap) return;
    actions.swapParties();
    actions.setError('showIdError', false);
  };

  const pick = (id: string, takenByOtherSide: boolean) => {
    if (takenByOtherSide) return;

    if (picking === 'sender') {
      if (id !== data.senderId) actions.toggleSenderId(id);
    } else if (picking === 'receiver') {
      if (id !== data.receiverId) actions.toggleReceiverId(id);
    }

    actions.setError('showIdError', false);
    setPicking(null);
  };

  return (
    <StyledGroupMenu $inputError={errorCondition}>
      {fromHomeGroup && (
        <div className="nonGroupGroupPill">
          <SelectedGroup
            group={fromHomeGroup.value}
            onRemove={() => {
              fromHomeGroup.value = null;
            }}
          />
          <div />
        </div>
      )}

      <div className="directionCard">
        <SendMenuWrapper
          title="Sender"
          idError={idError}
          id={data.senderId}
          userMemberId={userMemberId}
          showIdError={data.errors.showIdError}
          sortedMembers={sortedMembers}
          onOpen={() => setPicking('sender')}
        />

        <div className="divider">
          <div
            className={`swap${canSwap ? '' : ' disabled'}`}
            onClick={canSwap ? swap : undefined}
          >
            <IonIcon name="swap-vertical-outline" />
          </div>
        </div>

        <SendMenuWrapper
          title="Receiver"
          idError={idError}
          id={data.receiverId}
          userMemberId={userMemberId}
          showIdError={data.errors.showIdError}
          sortedMembers={sortedMembers}
          onOpen={() => setPicking('receiver')}
        />
      </div>

      {errorCondition ? (
        <span className="errorMsg">{idError.error}</span>
      ) : null}

      {picking && (
        <>
          <div className="sheetBackdrop" onClick={() => setPicking(null)} />
          <StyledMemberSheet>
            <div className="sheetHandle" />
            <div className="sheetTitle">
              {picking === 'sender' ? 'Sent from' : 'Received by'}
            </div>
            <div className="membersCard">
              {sortedMembers.value.map((m) => {
                const name = m.id === userMemberId ? 'You' : m.name;
                const role =
                  m.id === data.senderId
                    ? 'From'
                    : m.id === data.receiverId
                      ? 'To'
                      : null;
                const takenByOtherSide =
                  picking === 'sender'
                    ? m.id === data.receiverId
                    : m.id === data.senderId;

                return (
                  <div
                    key={m.id}
                    className={`memberRow${m.id === pickedId ? ' picked' : ''}${
                      takenByOtherSide ? ' taken' : ''
                    }`}
                    onClick={() => pick(m.id, takenByOtherSide)}
                  >
                    <span className="avatar">{getInitials(m.name)}</span>
                    <span className="name">{name}</span>
                    {role ? <span className="sideTag">{role}</span> : null}
                  </div>
                );
              })}
            </div>
          </StyledMemberSheet>
        </>
      )}
    </StyledGroupMenu>
  );
};
