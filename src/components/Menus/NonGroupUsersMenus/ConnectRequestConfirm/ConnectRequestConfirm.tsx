import IonIcon from '@reacticons/ionicons';
import {
  StyledConnectRequestBackdrop,
  StyledConnectRequestConfirm,
} from './ConnectRequestConfirm.styled';
import MyButton from '../../../MyButton/MyButton';

type ConnectRequestConfirmProps = {
  username: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConnectRequestConfirm({
  username,
  isLoading,
  onConfirm,
  onCancel,
}: ConnectRequestConfirmProps) {
  return (
    <>
      <StyledConnectRequestBackdrop onClick={onCancel} />
      <StyledConnectRequestConfirm>
        <div className="dialogHeader">
          <IonIcon name="person-add-outline" className="dialogIcon" />
          <div className="dialogTitle">Do you know {username}?</div>
          <div className="closeButton" onClick={onCancel}>
            <IonIcon name="close-outline" />
          </div>
        </div>
        <div className="info">
          You have not split expenses with <strong>{username}</strong> before.
          Send them a request. Once they accept, you will be able to add each
          other to shared expenses.
        </div>
        <div className="buttons">
          <MyButton onClick={onConfirm} isLoading={isLoading}>
            Send request
          </MyButton>
          <MyButton variant="secondary" onClick={onCancel}>
            Cancel
          </MyButton>
        </div>
      </StyledConnectRequestConfirm>
    </>
  );
}
