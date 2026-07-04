import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { StyledEditUsername } from './EditUsername.styled';
import MyButton from '../../MyButton/MyButton';
import Separator from '../../Separator/Separator';
import { useGetUsernameStatus } from '../../../api/auth/QueryHooks/useGetUsernameStatus';
import { useEditUsername } from '../../../api/auth/CommandHooks/useEditUsername';
import Spinner from '../../Spinner/Spinner';
import { GrFormCheckmark } from 'react-icons/gr';
import { FiAlertTriangle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
export default function EditUsername({ existingUsername, editUsernameMenu, }) {
    const [username, setUsername] = useState(existingUsername);
    const [errorMessage, setErrorMessage] = useState();
    const params = useParams();
    const groupId = params?.groupid;
    const usernameStatus = useGetUsernameStatus(username);
    const { mutate: editUsername, isPending } = useEditUsername(groupId);
    useEffect(() => {
        if (!usernameStatus.isSuccess) {
            return;
        }
        if (!usernameStatus.data.isValid) {
            setErrorMessage(usernameStatus.data.errorMessage);
            return;
        }
        if (!usernameStatus.data.isAvailable) {
            setErrorMessage('Already taken');
            return;
        }
        setErrorMessage(undefined);
    }, [usernameStatus]);
    const handleInputChange = (e) => {
        setErrorMessage(undefined);
        setUsername(e.target.value);
    };
    const handleConfirm = (_) => {
        editUsername(username || '', {
            onSuccess: () => {
                editUsernameMenu.value = null;
            },
        });
    };
    return (_jsxs(StyledEditUsername, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx("input", { placeholder: "Select username", className: "input", value: username, onChange: handleInputChange, autoFocus: true }), username &&
                                username.length > 0 &&
                                (!usernameStatus.isSuccess ? (_jsx(Spinner, { fontSize: '25px' })) : !errorMessage ? (_jsx(GrFormCheckmark, { className: "checkmark" })) : (_jsx(FiAlertTriangle, { className: "warning" })))] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsx("div", { className: "username-status", children: errorMessage ?? '\xa0' }), _jsxs("div", { className: "buttons", children: [_jsx(MyButton, { isLoading: isPending, onClick: handleConfirm, children: "Confirm" }), _jsx(MyButton, { variant: "secondary", onClick: () => (editUsernameMenu.value = null), children: "Cancel" })] })] }));
}
