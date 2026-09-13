import React from 'react';
import BackButton from '../BackButton/BackButton';
import { StyledTopBarWithBackButton } from './TopBarWithBackButton.styled';
import { TopBarWithBackButtonProps } from '../../interfaces';

export default function TopBarWithBackButton({
  onClick,
  header,
}: TopBarWithBackButtonProps) {
  return (
    <StyledTopBarWithBackButton>
      <BackButton onClick={onClick} />
      <div className="descr">{header}</div>
    </StyledTopBarWithBackButton>
  );
}
