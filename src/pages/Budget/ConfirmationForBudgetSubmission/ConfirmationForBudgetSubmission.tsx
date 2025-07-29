import { StyledConfirmationForBudgetSubmission } from "./ConfirmationForBudgetSubmission.styled";
import MyButton from "../../../components/MyButton/MyButton";
import { ConfirmationForBudgetSubmissionProps } from "../../../interfaces";

export default function ConfirmationForBudgetSubmission({
  submitBudget,
  // setMenu,
  menu,
}: ConfirmationForBudgetSubmissionProps) {
  return (
    <StyledConfirmationForBudgetSubmission>
      <div className="header">
        {" "}
        <strong>Submit Budget</strong>
      </div>
      <div className="prompt">
        Submitting a new budget will replace your current one.Would you like to
        continue?
      </div>

      <MyButton onClick={submitBudget}>Continue</MyButton>
      <MyButton onClick={() => (menu.value = null)}>Cancel</MyButton>
    </StyledConfirmationForBudgetSubmission>
  );
}
