import IonIcon from '@reacticons/ionicons';
import { ParticipantsPayersErrorMenuProps } from '../../../interfaces';
import { StyledRemoveGuestWarning } from './ParticipantsPayersErrorMenu.styled';

export default function ParticipantsPayersErrorMenu({
  menu,
  error,
}: ParticipantsPayersErrorMenuProps) {
  return (
    <StyledRemoveGuestWarning>
      <div className="dialogHeader">
        <IonIcon name="warning-outline" className="dialogIcon danger" />
        <div className="dialogTitle">Hmm... 🤔</div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" />
        </div>
      </div>
      <div className="info">{error}</div>
    </StyledRemoveGuestWarning>
  );
}
