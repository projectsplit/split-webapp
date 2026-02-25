import { ExpenseResponseItem, TransactionType } from "@/types";
import Confirmation from "./Confirmation";
import { Signal } from "@preact/signals-react";
import { createJumpToken } from "@/api/auth/helpers/createJumpToken";
import { useNavigate } from "react-router-dom";

interface NavigateToExpenseConfirmationProps {
  menu: Signal<string | null>;
  selectedExpense: Signal<ExpenseResponseItem | null>
  errorMessage: Signal<string | null>;
}
export const NavigateToExpenseConfirmation = ({
  menu,
  selectedExpense,
  errorMessage
}: NavigateToExpenseConfirmationProps) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selectedExpense.value?.transactionType === TransactionType.Group) {
      const jumpToken = createJumpToken(selectedExpense.value.occurred, selectedExpense.value.created);
      navigate(`/shared/${selectedExpense.value.groupId}/expenses?jumpTo=${jumpToken}`)
    }
    else if (selectedExpense.value?.transactionType === TransactionType.NonGroup) {
      const jumpToken = createJumpToken(selectedExpense.value.occurred, selectedExpense.value.created);
      navigate(`/shared/nongroup/expenses?jumpTo=${jumpToken}`)
    }
    else return
  };


  return (
    <Confirmation onClick={handleNavigate} menu={menu} isLoading={false} header={"Confirmation"}>
      <div>
        {`You will be navigated to the ${selectedExpense.value?.transactionType === TransactionType.Group ? "group" : "non groups"} expense page. Proceed?`}
      </div>
    </Confirmation>
  );
}