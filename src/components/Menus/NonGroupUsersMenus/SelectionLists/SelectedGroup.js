import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { TiGroup } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
export const SelectedGroup = React.memo(({ group, onRemove }) => {
    if (!group)
        return null;
    return (_jsxs(StyledSelectedGroup, { className: "selected-label", style: { backgroundColor: '#696e80', color: 'white' }, onClick: onRemove, children: [_jsxs("div", { className: "info", children: [_jsx(TiGroup, {}), group.name] }), _jsx(IoClose, {})] }, group.id));
});
const StyledSelectedGroup = styled.span `
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
