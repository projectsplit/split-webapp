import { TiGroup } from 'react-icons/ti';
import { StyledNonGroupMenu } from './NonGroupMenu.styled';
import { StyledSendMenu } from '../SendMenuWrapper/SendMenuWrapper.styled';
import { TransferState } from '../formStore/formStoreTypes';
import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import { getInitials } from '@/helpers/getInitials';

interface NonGroupMenuProps {
  $noReceiverSelected?: boolean;
  $isSamePersonError: boolean;
  data: Pick<TransferState, 'currencySymbol' | 'errors'>;
  actions: Pick<TransferState, 'setError'>;
  fromHome: boolean | undefined;
  currentUserName: string | undefined;
  nonGroupMenu: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    receiverId: string;
    senderName: string;
    receiverName: string;
  }>;
}

export const NonGroupMenu = ({
  $noReceiverSelected,
  $isSamePersonError,
  data,
  actions,
  fromHome,
  nonGroupMenu,
  currentUserName,
}: NonGroupMenuProps) => {
  const clearErrors = () => {
    actions.setError('showSamePersonError', false);
    actions.setError('isSameUserError', '');
    actions.setError('showIdError', false);
  };

  const openPicker = (attribute: 'sender' | 'receiver' | 'groups') => {
    nonGroupMenu.value = {
      ...nonGroupMenu.value,
      attribute,
      menu: 'nonGroupTransfer',
    };
    clearErrors();
  };

  const canSwap =
    !!nonGroupMenu.value.senderName && !!nonGroupMenu.value.receiverName;

  const swap = () => {
    const { senderId, receiverId, senderName, receiverName } =
      nonGroupMenu.value;
    if (!canSwap) return;
    nonGroupMenu.value = {
      ...nonGroupMenu.value,
      senderId: receiverId,
      receiverId: senderId,
      senderName: receiverName,
      receiverName: senderName,
    };
    clearErrors();
  };

  const errorMessage =
    (data.errors.showAmountError && data.errors.isSameUserError) ||
    (data.errors.showIdError && data.errors.idErrorMessage) ||
    '';

  const row = (
    label: 'From' | 'To',
    name: string,
    onOpen: () => void,
    hasError: boolean
  ) => (
    <StyledSendMenu $inputError={hasError}>
      <div className="sendRow" onClick={onOpen}>
        <span className="rowLabel">{label}</span>
        <span className="rowValue">
          {name ? (
            <>
              <span className="avatar">
                {getInitials(name === 'You' ? currentUserName : name)}
              </span>
              <span className="name">{name}</span>
            </>
          ) : (
            <span className="placeholder">Choose</span>
          )}
          <IonIcon name="chevron-forward-outline" className="rowIcon" />
        </span>
      </div>
    </StyledSendMenu>
  );

  return (
    <StyledNonGroupMenu
      $noReceiverSelected={$noReceiverSelected}
      $isSamePersonError={$isSamePersonError}
      $inputError={!!errorMessage}
    >
      <div className="directionCard">
        {row(
          'From',
          nonGroupMenu.value.senderName,
          () => openPicker('sender'),
          $isSamePersonError
        )}

        <div className="divider">
          <div
            className={`swap${canSwap ? '' : ' disabled'}`}
            onClick={canSwap ? swap : undefined}
          >
            <IonIcon name="swap-vertical-outline" />
          </div>
        </div>

        {row(
          'To',
          nonGroupMenu.value.receiverName,
          () => openPicker('receiver'),
          $isSamePersonError || (!!errorMessage && !!$noReceiverSelected)
        )}
      </div>

      {errorMessage ? <span className="errorMsg">{errorMessage}</span> : null}

      {fromHome && (
        <div className="groupButton" onClick={() => openPicker('groups')}>
          <TiGroup className="groupIcon" />
          <span className="descr">Groups</span>
        </div>
      )}
    </StyledNonGroupMenu>
  );
};
