import { ExpenseFormProps } from "../../interfaces";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseForm2 from "../ExpenseForm/ExpenseForm";


const CreateExpenseForm: React.FC<ExpenseFormProps> = ({
  group,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense
}) => {
 
  return (
    <ExpenseForm2
      expense={expense}
      group={group}
      menu={menu}
      timeZoneCoordinates={timeZoneCoordinates}
      timeZoneId={timeZoneId}
      header={header}
      isCreateExpense={true}
      selectedExpense={selectedExpense}
    />
  );
};

export default CreateExpenseForm;

