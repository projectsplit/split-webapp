import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { StyledGenerateInvitationCode } from './GenerateInvitationCode.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useGenerateInvitationCode } from '../../api/auth/CommandHooks/useGenerateInvitationCode';
import { IoClose } from 'react-icons/io5';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { useSignal } from '@preact/signals-react';
import ShareGroup from './ShareGroup/ShareGroup';
import RevokeAccess from './RevokeAccess/RevokeAcces';
import useGroup from '../../api/auth/QueryHooks/useGroup';
import { useGetGroupJoinCodes } from '../../api/auth/QueryHooks/useGetGroupJoinCodes';
import { useQueryClient } from '@tanstack/react-query';
export default function GenerateInvitationCode() {
    const pageSize = 10;
    const queryClient = useQueryClient();
    const params = useParams();
    const navigate = useNavigate();
    const [invitationCode, setInvitationCode] = useState(null);
    const [groupName, setGroupName] = useState('');
    const qrRef = useRef(null);
    const category = useSignal('Share Group');
    const mostRecentCodeHasBeenRevoked = useSignal(true);
    const isFirstRender = useRef(true);
    const landedFromGroup = new URLSearchParams(location.search).get('in');
    const { mutate: mutateGenerate, isPending: isPendingGenerate } = useGenerateInvitationCode();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetGroupJoinCodes(params.groupid || '', pageSize);
    const codesData = data?.pages.flatMap((x) => x.codes) || [];
    const validCodeAlreadyExists = codesData &&
        codesData.length > 0 &&
        codesData[0].timesUsed < codesData[0].maxUses &&
        new Date(codesData[0].expires) >= new Date();
    const group = useGroup(params.groupid);
    useEffect(() => {
        if (group?.data?.name && !groupName) {
            setGroupName(group.data.name);
        }
    }, [group?.data?.name, groupName]);
    useEffect(() => {
        if (isFetching)
            return;
        if (validCodeAlreadyExists) {
            setInvitationCode(codesData[0].id);
            mostRecentCodeHasBeenRevoked.value = false;
            isFirstRender.current = false;
        }
        else if (mostRecentCodeHasBeenRevoked.value || isFirstRender.current) {
            mutateGenerate({ groupId: params.groupid || '' }, {
                onSuccess: (code) => {
                    setInvitationCode(code);
                    mostRecentCodeHasBeenRevoked.value = false;
                    isFirstRender.current = false;
                    queryClient.invalidateQueries({
                        queryKey: ['getGroupJoinCodes', params.groupid || '', pageSize],
                    });
                },
            });
        }
    }, [mutateGenerate, category.value, isFetching]);
    return (_jsxs(StyledGenerateInvitationCode, { children: [_jsx("div", { className: "fixed-header-container", children: _jsxs("div", { className: "header", children: [_jsx("div", { className: "gap" }), _jsx("div", { className: "title", children: _jsx(CategorySelector, { activeCat: 'Invite User', categories: {
                                    cat1: 'Share Group',
                                    cat2: 'Revoke Access',
                                }, navLinkUse: false, activeCatAsState: category }) }), _jsx("div", { className: "closeButtonContainer", onClick: () => {
                                if (landedFromGroup === 'true') {
                                    navigate(`/shared/${params.groupid}`, { replace: true });
                                }
                                else {
                                    navigate('/shared', { replace: true });
                                }
                            }, children: _jsx(IoClose, { className: "closeButton" }) })] }) }), category.value === 'Share Group' ? (_jsx(ShareGroup, { groupName: groupName, isPending: isPendingGenerate || isFetching, qrRef: qrRef, invitationCode: invitationCode, mutate: mutateGenerate, groupId: params.groupid || '', setInvitationCode: setInvitationCode, expires: codesData[0]?.expires })) : (_jsx(RevokeAccess, { groupId: params.groupid || '', hasNextPage: hasNextPage, fetchNextPage: fetchNextPage, isFetching: isFetching, isFetchingNextPage: isFetchingNextPage, data: data, groupName: groupName, mostRecentCodeHasBeenRevoked: mostRecentCodeHasBeenRevoked, invitationCode: invitationCode }))] }));
}
