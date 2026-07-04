import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledRevokeAccess } from './RevokeAccess.styled';
import Sentinel from '../../../components/Sentinel';
import RevokeAccessItem from './RevokeAccessItem/RevokeAccessItem';
import Spinner from '../../../components/Spinner/Spinner';
import { TbQrcodeOff } from 'react-icons/tb';
export default function RevokeAccess({ groupId, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, data, groupName, invitationCode, mostRecentCodeHasBeenRevoked, }) {
    if (isFetching && !isFetchingNextPage) {
        return (_jsx(StyledRevokeAccess, { children: _jsx("div", { className: "spinner", children: _jsx(Spinner, {}) }) }));
    }
    return (_jsxs(StyledRevokeAccess, { children: [data?.pages.flatMap((x) => x.codes).length === 0 ? (_jsxs("div", { className: "textAndIcon", children: [_jsxs("div", { className: "textEmoji", children: [_jsxs("span", { className: "text", children: ["No passcodes to revoke for \"", groupName, "\"", ' '] }), _jsx("span", { className: "emoji", children: "\uD83E\uDDD0" })] }), _jsx(TbQrcodeOff, { className: "icon" })] })) : groupName.length > 0 ? (_jsxs("div", { className: "promptText", children: ["Select the passcode you\u2019d like to revoke. Members who have already joined \u201C", groupName, "\u201D with this code will remain in the group, but it will no longer work for new members."] })) : (_jsx("div", { className: "promptText", children: "Select the passcode you\u2019d like to revoke. Members who have already joined with this code will remain in the group, but it will no longer work for new members." })), _jsxs("div", { className: "scrollable-content", children: [data?.pages.flatMap((x) => x.codes.map((code) => (_jsx(RevokeAccessItem, { expires: code.expires, id: code.id, maxUses: code.maxUses, timesUsed: code.timesUsed, groupId: groupId, invitationCode: invitationCode, mostRecentCodeHasBeenRevoked: mostRecentCodeHasBeenRevoked }, code.id)))), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] })] }));
}
