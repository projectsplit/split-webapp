import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Transfer from '../../components/Transfer/Transfer';
import LongPressMenu from '../../components/LongPressMenu/LongPressMenu';
import DeleteTransferAnimation from '../../components/Animations/DeleteTransferAnimation';
import { StyledTransfers } from './Transfers.styled';
import { useOutletContext } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { DateOnly } from '../../helpers/timeHelpers';
import DetailedTransfer from '../../components/DetailedTransfer/DetailedTransfer';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import ErrorMenuAnimation from '../../components/Animations/ErrorMenuAnimation';
import Sentinel from '../../components/Sentinel';
import Spinner from '../../components/Spinner/Spinner';
import GroupTotalsByCurrencyAnimation from '../../components/Animations/GroupTotalsByCurrencyAnimation';
import getAllTransfersParticipants from '@/helpers/getAllTransfersParticipants';
import { useGetAllNonGroupUsers } from '@/api/auth/QueryHooks/useGetAllNonGroupUsers';
import { useTransferList } from './hooks/useTransferList';
import { groupBy } from '../../helpers/groupBy';
import { NoTransfersFound } from './NoTransfersFound/NoTransfersFound';
import { FiltersAndBars } from './FiltersAndBars/FiltersAndBars';
import { useTransferTotals } from './hooks/useTransferTotals';
const Transfers = () => {
    const pageSize = 10;
    const { userInfo, group, showBottomBar, transferParsedFilters, mode } = useOutletContext();
    const groupIsArchived = group?.isArchived;
    const errorMessage = useSignal('');
    const menu = useSignal(errorMessage.value ? 'error' : null);
    const queryClient = useQueryClient();
    const timeZoneId = userInfo?.timeZone;
    const memberId = group?.members.find((x) => x.userId === userInfo?.userId)?.id;
    const selectedTransfer = useSignal(null);
    const longPressTransfer = useSignal(null);
    const longPressMenu = useSignal(null);
    const members = group?.members;
    const guests = group?.guests;
    const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
    const scrollAreaRef = useRef(null);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, hasPreviousPage, } = useTransferList(mode, group, transferParsedFilters, pageSize, timeZoneId);
    const { allUsers } = useGetAllNonGroupUsers(mode);
    const transfers = data?.pages.flatMap((p) => p.transfers);
    const allParticipants = getAllTransfersParticipants(transfers, mode, members, guests, allUsers.map((u) => ({
        id: u.userId,
        name: u.username,
    })));
    useEffect(() => {
        if (isFetching && !isFetchingNextPage) {
            showBottomBar.value = false;
        }
        else {
            showBottomBar.value = true;
        }
    }, [isFetching, isFetchingNextPage, showBottomBar]);
    const { userTotalSentByCurr, userTotalReceivedByCurr, userConvertedTotalReceived, userConvertedTotalSent, totalsAreFetching, } = useTransferTotals(group, mode, userInfo, transferParsedFilters);
    if (isFetching && !isFetchingNextPage) {
        return (_jsx("div", { className: "spinner", children: _jsx(Spinner, {}) }));
    }
    return (_jsxs(StyledTransfers, { children: [_jsxs("div", { className: "scroll-area", ref: scrollAreaRef, children: [transfers && transfers.length > 0 && !hasPreviousPage && (_jsx(FiltersAndBars, { transferParsedFilters: transferParsedFilters, allParticipants: allParticipants, group: group, queryClient: queryClient, menu: menu, currency: userInfo?.currency, totalsAreFetching: totalsAreFetching, userConvertedTotalReceived: userConvertedTotalReceived, userConvertedTotalSent: userConvertedTotalSent })), !transfers || transfers.length === 0 ? (_jsx(NoTransfersFound, { transferParsedFilters: transferParsedFilters, allParticipants: allParticipants, group: group, queryClient: queryClient })) : (_jsx(_Fragment, { children: Object.entries(groupBy(transfers, (x) => DateOnly(x.occurred, timeZoneId))).map(([date, transfers]) => (_jsxs("div", { className: "same-date-container", children: [_jsx("div", { className: "date-only", children: date }), _jsx("div", { className: "transfers", children: transfers.map((t) => (_jsx(Transfer, { onClick: () => (selectedTransfer.value = t), onLongPress: () => {
                                            longPressTransfer.value = t;
                                            longPressMenu.value = 'options';
                                        }, transfer: {
                                            amount: t.amount,
                                            currency: t.currency,
                                            date: t.occurred,
                                            description: t.description,
                                            id: t.id,
                                            senderName: t.senderId === memberId ||
                                                t.senderId === userInfo?.userId
                                                ? 'You'
                                                : (allParticipants.find((x) => x.id === t.senderId)
                                                    ?.name ?? ''),
                                            receiverName: t.receiverId === memberId ||
                                                t.receiverId === userInfo?.userId
                                                ? 'You'
                                                : (allParticipants.find((x) => x.id === t.receiverId)?.name ?? ''),
                                        }, timeZoneId: timeZoneId }, t.id))) })] }, date))) })), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] }), selectedTransfer.value && (_jsx(DetailedTransfer, { selectedTransfer: selectedTransfer, amount: selectedTransfer.value.amount, created: selectedTransfer.value.created, creator: selectedTransfer.value.creatorId, currency: selectedTransfer.value.currency, occurred: selectedTransfer.value.occurred, timeZoneId: timeZoneId, errorMessage: errorMessage, userMemberId: userMemberId || '', members: allParticipants, groupIsArchived: groupIsArchived, userId: userInfo?.userId || '' })), longPressMenu.value === 'options' &&
                longPressTransfer.value &&
                !groupIsArchived && (_jsx(LongPressMenu, { onDelete: () => (longPressMenu.value = 'deleteTransfer'), onClose: () => (longPressMenu.value = null) })), longPressMenu.value === 'deleteTransfer' && (_jsx("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(2px)',
                    zIndex: 998,
                }, onClick: () => (longPressMenu.value = null) })), _jsx(DeleteTransferAnimation, { menu: longPressMenu, selectedTransfer: longPressTransfer, errorMessage: errorMessage }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(ErrorMenuAnimation, { menu: menu, message: errorMessage.value, type: "transfer" }), _jsx(GroupTotalsByCurrencyAnimation, { menu: menu, bar1Legend: "You Sent", bar2Legend: "You Received", bar1Color: "#0CA0A0", bar2Color: "#D79244", groupTotalsByCurrency: userTotalSentByCurr, userTotalsByCurrency: userTotalReceivedByCurr })] }));
};
export default Transfers;
