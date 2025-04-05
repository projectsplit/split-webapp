import { StyledSelectionButton } from "./SelectionButton.styled";
import OptionsContainer from "../../../components/OptionsContainer/OptionsContainer";
import { SelectionButtonProps } from "../../../interfaces";

export default function SelectionButton({
  children,
  name,
  description,
  onClick,
  hasArrow
}: SelectionButtonProps) {
  return (
    <StyledSelectionButton onClick={onClick}>
      <OptionsContainer hasOption={hasArrow} optionname="chevron-forward-outline">
        <div className="main">
          {children}
          <div className="confing">
            <div className="name">{name}</div>
            <div className="descr">{description}</div>
          </div>
        </div>
      </OptionsContainer>
    </StyledSelectionButton>
  );
}
