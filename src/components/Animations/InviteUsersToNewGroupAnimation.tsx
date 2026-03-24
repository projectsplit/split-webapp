import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InviteUsersToNewGroup } from '../Menus/InviteUsersToNewGroupMenu/InviteUsersToNewGroup';
import { Signal } from '@preact/signals-react';

interface InviteUsersToNewGroupAnimationProps {
  menu: Signal<string | null>;
  newGroup: Signal<{groupName:string;groupId:string}>;
}
export default function InviteUsersToNewGroupAnimation({
  menu,
  newGroup,
}: InviteUsersToNewGroupAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === 'inviteUsersToNewGroup'}
      classNames="infoBox"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <InviteUsersToNewGroup menu={menu} newGroup={newGroup} nodeRef={nodeRef} />
    </CSSTransition>
  );
}
