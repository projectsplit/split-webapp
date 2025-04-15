import { OptionsContainerProps } from "../../interfaces";
import { StyledOptionsContainer } from "./OptionsContainer.styled";
import IonIcon from "@reacticons/ionicons";


export default function OptionsContainer({
  children,
  onClick,
  hasOption,
  optionname,
  $optionColor,
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
        <IonIcon name={optionname} className="arrow" onClick={onIconClick} style={{color:$optionColor}}/>
      )}
    </StyledOptionsContainer>
  );
}
