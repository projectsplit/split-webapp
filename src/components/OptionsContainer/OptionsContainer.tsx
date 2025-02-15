
import { OptionsContainerProps } from "../../interfaces";
import { StyledOptionsContainer } from "./OptionsContainer.styled";

import IonIcon from "@reacticons/ionicons";

export default function OptionsContainer({
  children,
  onClick,
 hasarrow,

}: OptionsContainerProps) {
  return (
    <StyledOptionsContainer onClick={onClick} hasarrow={hasarrow} >
      {children}
      {hasarrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
    </StyledOptionsContainer>
  );
}
