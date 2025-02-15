import { StyledNewButton } from "./NewButton.styled";
import { NewButtonProps } from "../../../interfaces";
import { FaPlus } from "react-icons/fa";

export default function NewButton({ onClick }: NewButtonProps) {
  return (
    <StyledNewButton onClick={onClick}>
      <FaPlus className="plus" />
      <div className="new"> New</div>
    </StyledNewButton>
  );
}
