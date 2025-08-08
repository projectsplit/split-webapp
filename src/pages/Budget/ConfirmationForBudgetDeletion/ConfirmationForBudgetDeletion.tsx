import { StyledConfirmationForBudgetDeletion } from "./ConfirmationForBudgetDeletion.styled";
import MyButton from "../../../components/MyButton/MyButton";
import { ConfirmationForBudgetDeletionProps } from "../../../interfaces";

export default function ConfirmationForBudgetDeletion({
  removeBudget,
  menu,
}: ConfirmationForBudgetDeletionProps) {
  return (
    <StyledConfirmationForBudgetDeletion>
      <div className="header">
        {" "}
        <strong>Delete Budget</strong>
      </div>
      <div className="prompt">
        Are you sure you want to delete your current budget?
      </div>

      <MyButton onClick={removeBudget}>Confirm</MyButton>
      <MyButton onClick={() => menu.value =(null)}>Cancel</MyButton>
    </StyledConfirmationForBudgetDeletion>
  );
}
