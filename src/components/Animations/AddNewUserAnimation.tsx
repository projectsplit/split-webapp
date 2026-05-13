import { CSSTransition } from 'react-transition-group';
import { AddNewUserAnimationProps } from '../../interfaces';
import SearchUsersToInvite from '../../pages/SearchUsersToInvite';
import { useRef } from 'react';

export default function AddNewUserAnimation({
  menu,
  guestToBeReplaced,
  newGroupId,
  newMembers,
  accessedNewUsersInvitationsMenu,
}: AddNewUserAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === 'newUser'}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <SearchUsersToInvite
        menu={menu}
        guestToBeReplaced={guestToBeReplaced}
        newGroupId={newGroupId}
        newMembers={newMembers}
        accessedNewUsersInvitationsMenu={accessedNewUsersInvitationsMenu}
      />
    </CSSTransition>
  );
}
