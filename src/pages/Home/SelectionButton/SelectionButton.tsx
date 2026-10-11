import IonIcon from '@reacticons/ionicons';
import { StyledSelectionButton } from './SelectionButton.styled';
import { SelectionButtonProps } from '../../../interfaces';

export default function SelectionButton({
  children,
  name,
  badge,
  meta,
  footer,
  onClick,
}: SelectionButtonProps) {
  const row = (
    <>
      <span className="destinationIcon">{children}</span>
      <div className="destinationBody">
        <div className="destinationTitle">
          <span className="destinationName">{name}</span>
          {badge}
        </div>
        {meta ? <div className="destinationMeta">{meta}</div> : null}
      </div>
      <IonIcon
        name="chevron-forward-outline"
        className="destinationChevron"
      />
    </>
  );

  return (
    <StyledSelectionButton onClick={onClick}>
      {footer ? <div className="destinationRow">{row}</div> : row}
      {footer}
    </StyledSelectionButton>
  );
}
