import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledNotificationsMenu } from './NotificationsMenu.styled';
import { IoIosNotificationsOff } from 'react-icons/io';
import Sentinel from '../../Sentinel';
import Invitation from '../../Invitation/Invitation';
import ConnectionRequest from '../../ConnectionRequest/ConnectionRequest';
import Separator from '../../Separator/Separator';
import { useEffect } from 'react';
import { useLastViewedNotification } from '../../../api/auth/CommandHooks/useLastViewedNotification';
import { useGetUserInvitations } from '../../../api/auth/QueryHooks/useGetUserInvitations';
import { useGetConnectionRequests } from '../../../api/auth/QueryHooks/useGetConnectionRequests';
import Spinner from '../../Spinner/Spinner';
export default function NotificationsMenu({ menu, userInfo, }) {
    const timeZoneId = userInfo?.timeZone;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetUserInvitations(10);
    const { data: connectionRequestsData, fetchNextPage: fetchNextRequestsPage, hasNextPage: hasNextRequestsPage, isFetchingNextPage: isFetchingNextRequestsPage, isSuccess: isRequestsSuccess, } = useGetConnectionRequests(10);
    const userInvitations = data?.pages.flatMap((p) => p.invitations);
    const connectionRequests = connectionRequestsData?.pages.flatMap((p) => p.connectionRequests);
    const { mutate: updateNotification } = useLastViewedNotification();
    useEffect(() => {
        if (isSuccess &&
            isRequestsSuccess &&
            data.pages.length === 1 &&
            connectionRequestsData.pages.length === 1) {
            const latestInvitation = data.pages[0].invitations[0]?.created;
            const latestRequest = connectionRequestsData.pages[0].connectionRequests[0]?.created;
            const latestTimeStamp = [latestInvitation, latestRequest]
                .filter(Boolean)
                .sort()
                .pop();
            if (latestTimeStamp) {
                updateNotification(latestTimeStamp);
            }
        }
    }, [isSuccess, isRequestsSuccess, data, connectionRequestsData]);
    const isLoading = !userInvitations || !connectionRequests;
    const isEmpty = userInvitations?.length === 0 && connectionRequests?.length === 0;
    return (_jsxs(StyledNotificationsMenu, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "info", children: _jsx("strong", { children: "Notifications" }) }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsx("div", { className: "notifications", children: isLoading ? (_jsx(Spinner, {})) : isEmpty ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "No notifications" }), _jsx(IoIosNotificationsOff, { className: "icon" })] })) : (_jsxs("div", { className: "data", children: [connectionRequests.map((x) => (_jsx("div", { className: "item", children: _jsx(ConnectionRequest, { connectionRequest: x }) }, x.id))), _jsx(Sentinel, { fetchPage: fetchNextRequestsPage, hasMore: hasNextRequestsPage, isFetchingPage: isFetchingNextRequestsPage }), userInvitations.map((x, index) => (_jsx("div", { className: "item", children: _jsx(Invitation, { invitation: {
                                    id: x.id,
                                    created: x.created,
                                    groupId: x.groupId,
                                    guestId: x.guestId,
                                    groupName: x.groupName,
                                    receiverId: x.receiverId,
                                    senderId: x.senderId,
                                    guestName: x.guestName,
                                }, menu: menu, timeZoneId: timeZoneId }, x.id) }, index))), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] })) })] }));
}
