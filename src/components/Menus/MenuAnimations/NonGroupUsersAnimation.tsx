import { CSSTransition } from "react-transition-group";
import { NonGroupUsersAnimationProps } from "../../../interfaces";
import { useRef } from "react";
import { NonGroupUsersMenu } from "../NonGroupUsersMenu/NonGroupUsersMenu";

export default function NonGroupUsersAnimation({
  menu,
  nonGroupUsers,
  isPersonal,
  groupMembers,
  nonGroupGroups,
  isNonGroupExpense
}: NonGroupUsersAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === "nongroupusers"}
      timeout={100}
      unmountOnExit
    >
      <NonGroupUsersMenu menu={menu} nonGroupUsers={nonGroupUsers} isPersonal={isPersonal} groupMembers={groupMembers} nonGroupGroups={nonGroupGroups} isNonGroupExpense={isNonGroupExpense} />
    </CSSTransition>
  );
}
