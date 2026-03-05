import { IoClose } from "react-icons/io5";
import { StyledExpenseFormHeader } from "./ExpenseFormHeader.styled";
import { Signal } from "@preact/signals-react";
import { Group, Guest, Member, User } from "@/types";

interface ExpenseFormHeaderProps {
  header: string;
  isnonGroupExpense?: Signal<boolean>;
  fromHome?: boolean;
  nonGroupUsers: Signal<User[]>;
  groupMembers: Signal<(Member | Guest)[]>;
  isPersonal: Signal<boolean>;
  fromHomeGroup?: Signal<Group | null>;
  menu: Signal<string | null>;
}

export const ExpenseFormHeader = ({
  header,
  isnonGroupExpense,
  fromHome,
  nonGroupUsers,
  groupMembers,
  isPersonal,
  fromHomeGroup,
  menu,
}: ExpenseFormHeaderProps) => {
  return (
    <StyledExpenseFormHeader>
      <div className="gap"></div>
      <div className="title">{header}</div>
      <div
        className="closeButtonContainer"
        onClick={() => {
          if (isnonGroupExpense && isnonGroupExpense?.value) {
            if (fromHome) {
              nonGroupUsers.value = [];
              groupMembers.value = [];
              isPersonal.value = true;
              isnonGroupExpense.value = false;
              if (fromHomeGroup) {
                fromHomeGroup.value = null;
              }
            }
          }
          menu.value = null;
        }}
      >
        <IoClose className="closeButton" />
      </div>
    </StyledExpenseFormHeader>
  );
};
