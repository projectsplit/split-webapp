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
 * Confirmation before asking to split with someone you have never split with. Names them, because
 * usernames in a search result are easy to mistake for one another and the request is visible to
 * whoever ends up receiving it.
 */
export default function ConnectRequestConfirm({
  username,
  isLoading,
  onConfirm,
  onCancel,
}: ConnectRequestConfirmProps) {
  return (
    <StyledConnectRequestConfirm onClick={onCancel}>
      <div
        className="card"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="title">Do you know {username}?</div>
        <div className="message">
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
      </div>
    </StyledConnectRequestConfirm>
  );
}
