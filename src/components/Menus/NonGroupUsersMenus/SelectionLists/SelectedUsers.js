import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { styled } from 'styled-components';
export const SelectedUsers = React.memo(({ users, onRemove, currentUserId, }) => {
    return users.map((user) => user.userId !== currentUserId ? (_jsxs(StyledSelectedUser, { style: {
            backgroundColor: 'white',
            color: '#000000c8',
        }, onClick: () => onRemove(user.userId), className: "selected-label", children: [_jsxs("div", { className: "info", children: [' ', _jsx(BsFillPersonFill, {}), user.username] }), _jsx(IoClose, {})] }, user.userId)) : null);
});
const StyledSelectedUser = styled.span `
  color: #000000a2;
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 5px;
  padding: 2px 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;
