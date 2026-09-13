import IonIcon from '@reacticons/ionicons';
import { GeneralWarningMenuProps } from '../../../interfaces';
import MyButton from '../../MyButton/MyButton';
import { StyledGeneralWarningMenu } from './GeneralWarningMenu.styled';

export default function GeneralWarningMenu({
  menu,
  message,
  title,
}: GeneralWarningMenuProps) {
  return (
    <StyledGeneralWarningMenu>
      <div className="dialogHeader">
        <IonIcon name="warning-outline" className="dialogIcon danger" />
        <div className="dialogTitle">{title ? title : 'Warning'}</div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" />
        </div>
      </div>
      <div className="info">{message}</div>
      <div className="buttons">
        <MyButton onClick={() => (menu.value = null)}>Confirm</MyButton>
      </div>
    </StyledGeneralWarningMenu>
  );
}
