import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledMembers } from './Members.styled';
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { groupTransactions } from '../../helpers/groupTransactions';
import { Mode } from '../../types';
import { useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import MemberFC from './Member/MemberFC';
import SettleUpAnimation from '../../components/Animations/SettleUpAnimation';
import Spinner from '../../components/Spinner/Spinner';
import AddNewUserAnimation from '../../components/Animations/AddNewUserAnimation';
import getAllDebtsParticipants from '@/helpers/getAllDebtsParticipants';
import { useDebts } from '@/api/auth/QueryHooks/useDebts';
export default function Members() {
    const idSelectedToSettleUp = useSignal('');
    const menu = useSignal(null);
    const guestToBeReplaced = useSignal({
        guestId: '',
        guestName: '',
    });
    const { groupid } = useParams();
    const { userInfo, group, showBottomBar, mode } = useOutletContext();
    const { data, isFetching } = useDebts(mode, groupid);
    const { debts, totalSpent } = data ?? { debts: [], totalSpent: {} };
    const members = group?.members;
    const guests = group?.guests;
    const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
    const allParticipants = getAllDebtsParticipants(debts, mode, members, guests);
    const { groupedTransactions } = useMemo(() => {
        const groupedTransactions = mode === Mode.Group
            ? groupTransactions(debts ?? [], allParticipants ?? [], userMemberId || '')
            : groupTransactions(debts ?? [], allParticipants ?? [], userInfo?.userId || '');
        return { groupedTransactions };
    }, [debts]);
    useEffect(() => {
        isFetching ? (showBottomBar.value = false) : (showBottomBar.value = true);
    }, [isFetching]);
    if (!userInfo) {
        return (_jsx("div", { className: "spinner", children: _jsx(Spinner, {}) }));
    }
    const sortedParticipants = mode === Mode.Group
        ? [...allParticipants].sort((a, b) => {
            if (a.id === userMemberId)
                return -1;
            if (b.id === userMemberId)
                return 1;
            return 0;
        })
        : [...allParticipants].sort((a, b) => {
            if (a.id === userInfo?.userId)
                return -1;
            if (b.id === userInfo?.userId)
                return 1;
            return 0;
        });
    return (_jsxs(StyledMembers, { children: [isFetching ? (_jsx(Spinner, {})) : mode === Mode.NonGroup ? (_jsx(MemberFC, { group: group, pendingTransactions: debts ?? [], groupedTransactions: groupedTransactions, id: allParticipants.length > 0 ? allParticipants[0].id : userInfo.userId, name: allParticipants.length > 0 ? allParticipants[0].name : userInfo.username, isLogedUser: allParticipants.length > 0
                    ? allParticipants[0].id === userMemberId ||
                        allParticipants[0].id === userInfo.userId
                    : true, isGuest: allParticipants.length > 0 ? (guests?.some((g) => g.id === allParticipants[0].id) ?? false) : false, menu: menu, idSelectedToSettleUp: idSelectedToSettleUp, participants: allParticipants.length > 0 ? allParticipants : [{ id: userInfo.userId, name: userInfo.username }], totalSpent: totalSpent, guestToBeReplaced: guestToBeReplaced, userOrMemberId: userMemberId ?? userInfo.userId }, allParticipants.length > 0 ? allParticipants[0].id : userInfo.userId)) : (sortedParticipants?.map((p) => (_jsx(MemberFC, { group: group, pendingTransactions: debts ?? [], groupedTransactions: groupedTransactions, id: p.id, name: p.name, isLogedUser: p.id === userMemberId || p.id === userInfo.userId, isGuest: guests?.some((g) => g.id === p.id) ?? false, menu: menu, idSelectedToSettleUp: idSelectedToSettleUp, participants: allParticipants || [], totalSpent: totalSpent, guestToBeReplaced: guestToBeReplaced, userOrMemberId: userMemberId ?? userInfo.userId }, p.id)))), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(SettleUpAnimation, { menu: menu, pendingTransactions: debts ?? [], idSelectedToSettleUp: idSelectedToSettleUp, members: allParticipants || [], userId: userMemberId ?? userInfo.userId }), _jsx(AddNewUserAnimation, { menu: menu, guestToBeReplaced: guestToBeReplaced.value })] }));
}
