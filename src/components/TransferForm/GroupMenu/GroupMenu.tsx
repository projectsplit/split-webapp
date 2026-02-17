import { SelectedGroup } from "@/components/Menus/NonGroupUsersMenus/SelectionLists/SelectedGroup";
import SendMenuWrapper from "../SendMenuWrapper/SendMenuWrapper";
import { StyledGroupMenu } from "./GroupMenu.styled";
import { ReadonlySignal, Signal } from "@preact/signals-react";
import { Group, Guest, Member } from "@/types";
import { TransferState } from "../formStore/formStoreTypes";


interface GroupMenuProps {
  nonGroupGroup: Signal<Group | null> | undefined;
  isnonGroupTransfer: Signal<boolean> | undefined;
  idError: {
    isSenderError: boolean;
    isReceiverError: boolean;
    error: string;
  }
  data: Pick<TransferState, 'senderId' | 'receiverId' | 'errors'>;
  actions: Pick<TransferState, 'toggleSenderId' | 'toggleReceiverId' | 'setError'>;
  userMemberId: string | undefined
  sortedMembers: ReadonlySignal<(Member | Guest)[]>
}

export const GroupMenu = ({ nonGroupGroup, isnonGroupTransfer, idError, data, actions, userMemberId, sortedMembers }: GroupMenuProps) => {
  return (
    <StyledGroupMenu>
      {nonGroupGroup && isnonGroupTransfer && (
        <div className="nonGroupGroupPill">
          <SelectedGroup
            group={nonGroupGroup.value}
            onRemove={() => {
              nonGroupGroup.value = null;
              isnonGroupTransfer.value = true;
            }}
          />
          <div />
        </div>
      )}
      <SendMenuWrapper
        title="Sender"
        idError={idError}
        id={data.senderId}
        setId={actions.toggleSenderId}
        setShowIdError={(val) => actions.setError('showIdError', val)}
        userMemberId={userMemberId}
        showIdError={data.errors.showIdError}
        sortedMembers={sortedMembers}
      />
      <SendMenuWrapper
        title="Receiver"
        idError={idError}
        id={data.receiverId}
        setId={actions.toggleReceiverId}
        setShowIdError={(val) => actions.setError('showIdError', val)}
        userMemberId={userMemberId}
        showIdError={data.errors.showIdError}
        sortedMembers={sortedMembers}
      />
    </StyledGroupMenu>
  )
}