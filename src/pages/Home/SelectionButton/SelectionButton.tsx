import IonIcon from '@reacticons/ionicons';
import { StyledSelectionButton } from './SelectionButton.styled';
import { SelectionButtonProps } from '../../../interfaces';

export default function SelectionButton({
  children,
  name,
  meta,
  onClick,
}: SelectionButtonProps) {
  return (
    <StyledSelectionButton onClick={onClick}>
      <span className="destinationIcon">{children}</span>
      <div className="destinationBody">
        <div className="destinationName">{name}</div>
        {meta ? <div className="destinationMeta">{meta}</div> : null}
      </div>
      <IonIcon
        name="chevron-forward-outline"
        className="destinationChevron"
      />
    </StyledSelectionButton>
  );
}
