import {
  StyledInviteUsersToNewGroup,
  HeaderContainer,
  HeaderText,
  IconWrapper,
  ScrollableContent,
  BottomContainer,
} from './InviteUsersToNewGroup.styled';
import { Signal, useSignal } from '@preact/signals-react';
import { TiGroup } from 'react-icons/ti';
import MyButton from '@/components/MyButton/MyButton';
import AddNewUserAnimation from '@/components/Animations/AddNewUserAnimation';
import { generatePath, useNavigate, useOutletContext } from 'react-router-dom';
import { UserInfo } from '@/types';
import { getInitials } from '@/helpers/getInitials';
import routes from '@/routes';

interface InviteUsersToNewGroupProps {
  menu: Signal<string | null>;
  nodeRef: React.RefObject<HTMLDivElement | null>;
  newGroup: Signal<{ groupName: string; groupId: string }>;
}

export const InviteUsersToNewGroup = ({
  menu,
  newGroup,
}: InviteUsersToNewGroupProps) => {
  const newUserMenu = useSignal<string | null>(null);
  const navigate = useNavigate();
  const newMembers = useSignal<{ name: string; isUser: boolean }[]>([]);
  const accessedNewUsersInvitationsMenu = useSignal<boolean>(false);

  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();


  return (
    <StyledInviteUsersToNewGroup>
      <HeaderContainer>
        <IconWrapper>
          <TiGroup />
        </IconWrapper>
        <HeaderText>
          <div className="title">{newGroup.value.groupName} is ready</div>
          <div className="lead">
            Add the people you are splitting with, or start alone and add them
            later.
          </div>
        </HeaderText>
      </HeaderContainer>

      <ScrollableContent>
        <div className="sectionLabel">Members</div>
        <div className="membersCard">
          <div className="memberRow">
            <span className="memberAvatar you">
              {getInitials(userInfo?.username)}
            </span>
            <span className="memberName">You</span>
            <span className="memberStatus">Creator</span>
          </div>
          {newMembers.value.map((member, index) => (
            <div className="memberRow" key={index}>
              <span className="memberAvatar">{getInitials(member.name)}</span>
              <span className="memberName">{member.name}</span>
              <span className="memberStatus">
                {member.isUser ? 'Invited' : 'Guest'}
              </span>
            </div>
          ))}
        </div>
        <div className="membersNote">
          An invited member joins once they accept. A guest is yours to manage
          until a real user replaces them.
        </div>
      </ScrollableContent>

      <BottomContainer>
        <MyButton fontSize="15" onClick={() => (newUserMenu.value = 'newUser')}>
          {accessedNewUsersInvitationsMenu.value && newMembers.value.length > 0
            ? 'Manage members'
            : 'Add members'}
        </MyButton>
        <MyButton
          variant="secondary"
          fontSize="15"
          onClick={() => {
            menu.value = null;
            navigate(
              generatePath(routes.GROUP_EXPENSES, {
                groupid: newGroup.value.groupId,
              }),
              {
                state: {
                  groupName: newGroup.value.groupName,
                  isNewGroup: true,
                },
              }
            );
          }}
        >
          {accessedNewUsersInvitationsMenu.value && newMembers.value.length > 0
            ? 'Done'
            : 'Skip'}
        </MyButton>
      </BottomContainer>
        <AddNewUserAnimation
          menu={newUserMenu}
          newGroupId={newGroup.value.groupId}
          newMembers={newMembers}
          accessedNewUsersInvitationsMenu={accessedNewUsersInvitationsMenu}
        />
    </StyledInviteUsersToNewGroup>
  );
};

