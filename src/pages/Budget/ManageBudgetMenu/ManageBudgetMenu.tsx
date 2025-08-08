import { StyledManageBudgetMenu } from "./ManageBudgetMenu.styled";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { ManageBudgetMenuProps } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import MyButton from "../../../components/MyButton/MyButton";

export default function ManageBudgetMenu({ menu }: ManageBudgetMenuProps) {
  const navigate = useNavigate();
  return (
    <StyledManageBudgetMenu>
      <div className="header">
        {" "}
        <strong>Manage Budget</strong>
      </div>

      <MyButton onClick={() => navigate("/budget/create")} fontSize="16">
        <AiFillEdit className="icon" />
        <div className="text">Edit Budget</div>
      </MyButton>

      <MyButton
        fontSize="16"
        onClick={() => (menu.value = "deleteBudgetConfirmation")}
      >
        <AiFillDelete className="icon" />
        <div className="text">Remove Budget</div>
      </MyButton>
    </StyledManageBudgetMenu>
  );
}
