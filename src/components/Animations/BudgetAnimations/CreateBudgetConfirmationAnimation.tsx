import React from "react";
import { CSSTransition } from "react-transition-group";
import ConfirmationForBudgetSubmission from "../../../pages/Budget/ConfirmationForBudgetSubmission/ConfirmationForBudgetSubmission";
import { CreateBudgetConfirmationAnimationProps } from "../../../interfaces";


export default function CreateBudgetConfirmationAnimation({
  menu,
  submitBudget,
}: CreateBudgetConfirmationAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "createBudgetConfirmation"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <ConfirmationForBudgetSubmission
        menu={menu}
        submitBudget={submitBudget}
      />
    </CSSTransition>
  );
}
