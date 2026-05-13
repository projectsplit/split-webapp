import { PillProps } from '../../interfaces';
import { StyledPill } from './Pill.styled';
import { IoClose } from 'react-icons/io5';

export default function Pill({
  title,
  color,
  closeButton,
  onClick,
  onClose,
  fontSize,
  $textColor,
  $border,
  $closeButtonColor,
  children,
}: PillProps & { children?: React.ReactNode }) {
  return (
    <StyledPill
      color={color}
      fontSize={fontSize}
      $textColor={$textColor}
      $border={$border}
    >
      <div className="titleAndCloseButton" onClick={onClick}>
        <div className="childrenAndTitle">
          <div className="children" style={{ color: $textColor }}>
            {children}
          </div>
          <div className="title">{title}</div>
        </div>
        {closeButton ? (
          <div
            className="closeSign"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) {
                onClose(e);
              }
            }}
          >
            <IoClose
              fontSize={fontSize}
              color={$closeButtonColor ? $closeButtonColor : 'black'}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </StyledPill>
  );
}
