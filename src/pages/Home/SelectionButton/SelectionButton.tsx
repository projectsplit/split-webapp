import { StyledSelectionButton } from "./SelectionButton.styled";
import OptionsContainer from "../../../components/OptionsContainer/OptionsContainer";
import { SelectionButtonProps } from "../../../interfaces";

export default function SelectionButton({
  children,
  name,
  description,
  onClick
}: SelectionButtonProps) {
  return (
    <StyledSelectionButton onClick={onClick}>
      <OptionsContainer hasarrow={true}>
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
