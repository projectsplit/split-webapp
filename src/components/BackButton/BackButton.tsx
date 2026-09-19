import { MouseEventHandler } from 'react';
import IonIcon from '@reacticons/ionicons';
import { StyledBackButton } from './BackButton.styled';

interface BackButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export default function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <StyledBackButton className={className} onClick={onClick}>
      <IonIcon name="chevron-back-outline" />
    </StyledBackButton>
  );
}
