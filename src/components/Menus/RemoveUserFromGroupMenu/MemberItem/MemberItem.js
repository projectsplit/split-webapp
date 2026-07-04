import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import MyButton from '../../../MyButton/MyButton';
import { useRemoveGuestFromGroup } from '../../../../api/auth/CommandHooks/useRemoveGuestFromGroup';
export default function MemberItem({ member, groupId, noGroupError, noMemberError, isGuest, canBeRemoved, onCannotRemoveClick, newMembers, }) {
    const { mutate: removeGuest, isPending: isPendingGuest } = useRemoveGuestFromGroup(groupId, noGroupError, noMemberError);
    const handleClick = () => {
        if (!canBeRemoved) {
            onCannotRemoveClick();
            return;
        }
        isGuest ? removeGuest(member.id) : null;
        if (newMembers) {
            newMembers.value = newMembers.value.filter((m) => m.name !== member.name);
        }
    };
    return (_jsxs("div", { className: "memberWithButton", children: [isGuest ? (_jsxs("div", { className: "guestWrap", children: [_jsxs("span", { className: "name", children: [member.name, "*"] }), _jsx("span", { className: "guest", children: "guest*" })] })) : (_jsx("span", { className: "name", children: member.name })), _jsx(MyButton, { variant: "secondary", isLoading: isPendingGuest, onClick: handleClick, children: "Remove" })] }));
}
