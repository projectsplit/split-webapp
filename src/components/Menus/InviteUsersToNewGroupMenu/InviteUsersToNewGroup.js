import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledInviteUsersToNewGroup, HeaderContainer, IconWrapper, Title, Subtitle, ScrollableContent, BottomContainer, } from './InviteUsersToNewGroup.styled';
import { useSignal } from '@preact/signals-react';
import Separator from '../../Separator/Separator';
import { TiGroup } from 'react-icons/ti';
import MyButton from '@/components/MyButton/MyButton';
import AddNewUserAnimation from '@/components/Animations/AddNewUserAnimation';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { usePreventNavigation } from './hooks/usePreventNavigation';
export const InviteUsersToNewGroup = ({ menu, newGroup, }) => {
    const newUserMenu = useSignal(null);
    const navigate = useNavigate();
    const newMembers = useSignal([]);
    const accessedNewUsersInvitationsMenu = useSignal(false);
    const { userInfo } = useOutletContext();
    usePreventNavigation();
    return (_jsxs(StyledInviteUsersToNewGroup, { children: [_jsxs(HeaderContainer, { children: [_jsxs(IconWrapper, { children: [_jsx("svg", { width: "0", height: "0", children: _jsx("defs", { children: _jsxs("linearGradient", { id: "purple-fade", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#ac70c7" }), _jsx("stop", { offset: "60%", stopColor: "#432258" }), _jsx("stop", { offset: "100%", stopColor: "#0f0f0f" })] }) }) }), _jsx(TiGroup, { style: { fill: 'url(#purple-fade)', fontSize: '10rem' } })] }), _jsxs(Title, { children: ["Welcome to ", newGroup.value.groupName, ", ", userInfo.username, "!"] })] }), _jsx(Separator, {}), _jsx(Subtitle, { children: "Current members" }), _jsxs(ScrollableContent, { children: [_jsxs("div", { className: "membersContainer", children: ["You", _jsxs("div", { className: "status", children: ["Creator", _jsx("span", { className: "statusDot creator" })] })] }), newMembers.value.map((member, index) => (_jsxs("div", { className: "membersContainer", children: [_jsx("div", { children: member.name }), _jsxs("div", { className: "status", children: [member.isUser ? 'Invited' : 'Guest', _jsx("span", { className: `statusDot ${member.isUser ? 'invited' : 'guest'}` })] })] }, index)))] }), _jsxs(BottomContainer, { children: [_jsx("div", { className: "button", onClick: () => {
                            menu.value = null;
                            navigate(`/shared/${newGroup.value.groupId}/expenses`, {
                                state: { groupName: newGroup.value.groupName, isNewGroup: true },
                            });
                        }, children: accessedNewUsersInvitationsMenu.value && newMembers.value.length > 0
                            ? 'Done'
                            : 'Skip' }), _jsx(MyButton, { onClick: () => (newUserMenu.value = 'newUser'), children: accessedNewUsersInvitationsMenu.value && newMembers.value.length > 0
                            ? 'Manage Members'
                            : 'Add Members' })] }), _jsx(AddNewUserAnimation, { menu: newUserMenu, newGroupId: newGroup.value.groupId, newMembers: newMembers, accessedNewUsersInvitationsMenu: accessedNewUsersInvitationsMenu })] }));
};
