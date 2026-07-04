import React from 'react';
import { StyledConnectRequestConfirm } from './ConnectRequestConfirm.styled';
import MyButton from '../../../MyButton/MyButton';

type ConnectRequestConfirmProps = {
  username: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * One-time confirmation before splitting expenses with a user you have
 * never interacted with. Sends them a connection request to accept.
 */
export default function ConnectRequestConfirm({
  username,
  isLoading,
  onConfirm,
  onCancel,
}: ConnectRequestConfirmProps) {
  return (
    <StyledConnectRequestConfirm onClick={onCancel}>
      <div className="card" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="title">Do you know {username}?</div>
        <div className="message">
          You have not split expenses with <strong>{username}</strong> before.
          Send them a request — once they accept, you will be able to add each
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
      </div>
    </StyledConnectRequestConfirm>
  );
}
