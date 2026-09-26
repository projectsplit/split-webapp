import { SendMenuWrapperInterface } from '../../../interfaces';
import { StyledSendMenu } from './SendMenuWrapper.styled';
import IonIcon from '@reacticons/ionicons';
import { getInitials } from '../../../helpers/getInitials';

const SendMenuWrapper = ({
  title,
  idError,
  showIdError,
  sortedMembers,
  id,
  userMemberId,
  onOpen,
}: SendMenuWrapperInterface) => {
  const errorCondition =
    title === 'Sender'
      ? idError.isSenderError && showIdError
      : idError.isReceiverError && showIdError;

  const selected = sortedMembers.value.find((m) => m.id === id);
  const selectedName = selected
    ? selected.id === userMemberId
      ? 'You'
      : selected.name
    : '';

  return (
    <StyledSendMenu $inputError={errorCondition}>
      <div className="sendRow" onClick={onOpen}>
        <span className="rowLabel">{title === 'Sender' ? 'From' : 'To'}</span>
        <span className="rowValue">
          {selected ? (
            <>
              <span className="avatar">{getInitials(selected.name)}</span>
              <span className="name">{selectedName}</span>
            </>
          ) : (
            <span className="placeholder">Choose</span>
          )}
          <IonIcon name="chevron-forward-outline" className="rowIcon" />
        </span>
      </div>
    </StyledSendMenu>
  );
};

export default SendMenuWrapper;
