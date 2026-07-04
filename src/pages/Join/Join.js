import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { StyledJoin } from './Join.styled';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useJoinWithCode } from '../../api/auth/CommandHooks/useJoinWithCode';
import MyButton from '../../components/MyButton/MyButton';
import { useGetJoinCode } from '../../api/auth/QueryHooks/useGetJoinCode';
import routes from '../../routes';
import Spinner from '../../components/Spinner/Spinner';
import Separator from '../../components/Separator/Separator';
import { useSignal } from '@preact/signals-react';
const Join = () => {
    const errorMessage = useSignal('');
    const { code } = useParams();
    const navigate = useNavigate();
    if (!code) {
        navigate(routes.ROOT, { replace: true });
        return null;
    }
    const { data, isPending: getJoinCodeLoading, isError } = useGetJoinCode(code);
    const { mutate, isPending } = useJoinWithCode(errorMessage);
    const navigateToGroup = (groupId) => navigate(generatePath(routes.GROUP, { groupid: groupId }), {
        replace: true,
    });
    useEffect(() => {
        if (data?.isAlreadyMember) {
            navigateToGroup(data.groupId);
        }
    }, [data, navigate]);
    if (isError) {
        return (_jsx(StyledJoin, { children: _jsxs("div", { className: "errors", children: [_jsx("div", { className: "text", children: _jsx("div", { children: "Ah Snap! \uD83D\uDE35 This invitation has either expired or has been revoked." }) }), _jsx("div", { className: "buttons", children: _jsx(MyButton, { variant: "secondary", onClick: () => navigate(routes.ROOT, { replace: true }), children: "Close" }) })] }) }));
    }
    if (getJoinCodeLoading || !data) {
        return (_jsx(StyledJoin, { children: _jsx("div", { className: "spinner", children: _jsx(Spinner, {}) }) }));
    }
    if (data.isAlreadyMember) {
        return null;
    }
    return (_jsxs(StyledJoin, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsx("div", { className: "header", children: _jsx("div", { className: "info", children: _jsx("strong", { children: "Invitation" }) }) }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), errorMessage.value.length > 0 ? (_jsxs("div", { className: "errors", children: [_jsx("div", { className: "text", children: _jsxs("div", { children: [errorMessage.value, " \uD83D\uDE16"] }) }), _jsx("div", { className: "buttons", children: _jsx(MyButton, { variant: "secondary", onClick: () => navigate(routes.ROOT, { replace: true }), children: "Decline" }) })] })) : (_jsxs("div", { className: "NoErrors", children: [_jsx("div", { className: "text", children: _jsxs("div", { children: ["You have been invited to join ", _jsx("strong", { children: data.groupName })] }) }), _jsxs("div", { className: "buttons", children: [_jsxs(MyButton, { isLoading: isPending, onClick: () => mutate({
                                    code,
                                    onSuccess: () => navigateToGroup(data.groupId),
                                }), children: [' ', "Accept", ' '] }), _jsx(MyButton, { variant: "secondary", onClick: () => navigate(routes.ROOT, { replace: true }), children: "Decline" })] })] }))] }));
};
export default Join;
