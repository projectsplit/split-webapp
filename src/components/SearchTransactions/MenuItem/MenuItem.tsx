import { BeautifulMentionsMenuItemProps } from 'lexical-beautiful-mentions';
import { StyledMenuItem } from './MenuItem.styled';
import React from 'react';
import { labelChipInk, resolveLabelColor } from '../../../helpers/labelChip';
import { getInitials } from '../../../helpers/getInitials';
import Pill from '../../Pill/Pill';

export const MenuItem = React.forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ label, item, selected, ...restProps }, ref) => {
  const { color } = item?.data || {};
  const itemvalue = item?.value;
  const isUser = item?.data?.$isUser;
  const isGuest = item?.data?.isGuest;
  const name = isUser ? 'You' : itemvalue;
  const isLabel = !!item?.data && 'color' in item.data;

  if (isLabel) {
    return (
      <StyledMenuItem ref={ref} {...restProps} $selected={selected}>
        <Pill
          title={itemvalue ?? ''}
          color={resolveLabelColor(color as string)}
          closeButton={false}
          $border={false}
          $textColor={labelChipInk(resolveLabelColor(color as string))}
          fontSize="13px"
        />
      </StyledMenuItem>
    );
  }

  return (
    <StyledMenuItem ref={ref} {...restProps} $selected={selected}>
      <span className={`itemAvatar ${isUser ? 'you' : ''}`}>
        {getInitials(isUser ? itemvalue : name)}
      </span>
      <span className="title">{name}</span>
      {isGuest ? <span className="guestChip">Guest</span> : null}
    </StyledMenuItem>
  );
});
