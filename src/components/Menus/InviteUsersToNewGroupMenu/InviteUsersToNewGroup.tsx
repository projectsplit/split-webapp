import {
  StyledInviteUsersToNewGroup,
  HeaderContainer,
  IconWrapper,
  Title,
  Subtitle,
  ScrollableContent,
  BottomContainer,
} from './InviteUsersToNewGroup.styled';
import { Signal, useSignal } from '@preact/signals-react';
import Separator from '../../Separator/Separator';
import { TiGroup } from 'react-icons/ti';
import MyButton from '@/components/MyButton/MyButton';
import AddNewUserAnimation from '@/components/Animations/AddNewUserAnimation';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserInfo } from '@/types';
import { usePreventNavigation } from './hooks/usePreventNavigation';

interface InviteUsersToNewGroupProps {
  menu: Signal<string | null>;
  nodeRef: React.RefObject<HTMLDivElement>;
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

  usePreventNavigation();

  return (
    <StyledInviteUsersToNewGroup>
      <HeaderContainer>
        <IconWrapper>
          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="purple-fade"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ac70c7" />
                <stop offset="60%" stopColor="#432258" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </linearGradient>
            </defs>
          </svg>
          <TiGroup style={{ fill: 'url(#purple-fade)', fontSize: '10rem' }} />
        </IconWrapper>
        <Title>
          Welcome to {newGroup.value.groupName}, {userInfo.username}!
        </Title>
      </HeaderContainer>

      <Separator />

      <Subtitle>Current members</Subtitle>

      <ScrollableContent>
        <div className="membersContainer">
          You
          <div className="status">
            Creator
            <span className="statusDot creator" />
          </div>
        </div>
        {newMembers.value.map((member, index) => (
          <div className="membersContainer" key={index}>
            <div>{member.name}</div>
            <div className="status">
              {member.isUser ? 'Invited' : 'Guest'}
              <span
                className={`statusDot ${member.isUser ? 'invited' : 'guest'}`}
              />
            </div>
          </div>
        ))}
      </ScrollableContent>

      <BottomContainer>
        <div
          className="button"
          onClick={() => {
            menu.value = null;
            navigate(`/shared/${newGroup.value.groupId}/expenses`, {
              state: { groupName: newGroup.value.groupName, isNewGroup: true },
            });
          }}
        >
          {accessedNewUsersInvitationsMenu.value && newMembers.value.length > 0
            ? 'Done'
            : 'Skip'}
        </div>

        <MyButton onClick={() => (newUserMenu.value = 'newUser')}>
          {accessedNewUsersInvitationsMenu.value && newMembers.value.length > 0
            ? 'Manage Members'
            : 'Add Members'}
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

//onClick={() => (navigate(`/shared/${newGroup.value.groupId}/expenses`, {
//   state: { groupName:newGroup.value.groupName, isNewGroup: true },
// }))}
