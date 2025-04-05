import { useOutletContext } from "react-router-dom";
import { OptionsContainerProps } from "../../interfaces";
import { StyledOptionsContainer } from "./OptionsContainer.styled";

import IonIcon from "@reacticons/ionicons";
import { Signal } from "@preact/signals-react";

export default function OptionsContainer({
  children,
  onClick,
  hasOption,
  optionname,
  iconfontsize,
  right,
  onIconClick,
}: OptionsContainerProps) {

  return (
    <StyledOptionsContainer
      onClick={onClick}
      hasOption={hasOption}
      iconfontsize={iconfontsize}
      right={right}
    >
      {children}
      {hasOption && (
        <IonIcon name={optionname} className="arrow" onClick={onIconClick} />
      )}
    </StyledOptionsContainer>
  );
}
