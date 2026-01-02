import { CSSTransition } from "react-transition-group";
import { NonGroupExpenseUsersAnimationProps } from "../../../interfaces";
import { useRef } from "react";
import { NonGroupExpenseUsersMenu } from "../NonGroupUsersMenus/NonGroupExpenseUsersMenu/NonGroupExpenseUsersMenu";

export default function NonGroupExpenseUsersAnimation({
  menu,
  nonGroupUsers,
  isPersonal,
  groupMembers,
  nonGroupGroup,
  isNonGroupExpense,
  fromNonGroup
}: NonGroupExpenseUsersAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === "nonGroupExpenseUsers"}
      timeout={100}
      unmountOnExit
    >
      <NonGroupExpenseUsersMenu
        menu={menu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={isPersonal}
        groupMembers={groupMembers}
        nonGroupGroup={nonGroupGroup}
        isNonGroupExpense={isNonGroupExpense}
        fromNonGroup={fromNonGroup}
      />
    </CSSTransition>
  );
}
