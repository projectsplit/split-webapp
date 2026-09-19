import { StyledUserItem } from './UserItem.styled';
import { UserItemProps } from '../../../../interfaces';
import React from 'react';
import { MdGroup } from 'react-icons/md';

export default React.memo(function UserItem({ name, onClick }: UserItemProps) {
  return (
    <StyledUserItem>
      <div className="top-row" onClick={onClick}>
        <span className="avatar">
          <MdGroup />
        </span>
        <div>{name}</div>
      </div>
    </StyledUserItem>
  );
});
