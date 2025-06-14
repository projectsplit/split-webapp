import { PillProps } from "../../interfaces";
import { StyledPill } from "./Pill.styled";

import { IoClose } from "react-icons/io5";

export default function Pill({ title, color, closeButton, onClick, onClose, fontSize, $textColor,$border }: PillProps) {
  return (
    <StyledPill color={color} fontSize={fontSize} $textColor={$textColor} $border ={$border } >
      <div className="titleAndCloseButton" onClick={onClick}>
        <div className="title">{title}</div>
        {closeButton ? (
          <div className="closeSign" onClick={(e) => {
            e.stopPropagation();
            if (onClose) {
              onClose(e);
            }
          }}>
            <IoClose />
          </div>
        ) : (
          <></>
        )}
      </div>
    </StyledPill>
  );
}
