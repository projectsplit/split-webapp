import { ButtonShell, HoverOverlay, Label } from './InitializeButton.styled';

interface InitializeButtonProps {
  onClick?: () => void;
}

export const InitializeButton = ({ onClick }: InitializeButtonProps) => {
  return (
    <ButtonShell onClick={onClick}>
      <HoverOverlay />
      <Label>INITIALIZE THE ENGINE</Label>
    </ButtonShell>
  );
};
