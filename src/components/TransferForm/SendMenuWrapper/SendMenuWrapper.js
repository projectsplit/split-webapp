import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledSendMenu } from './SendMenu.styled';
const SendMenuWrapper = ({ title, idError, showIdError, sortedMembers, id, userMemberId, setId, setShowIdError, }) => {
    const errorCondition = title === 'Sender'
        ? idError.isSenderError && showIdError
        : idError.isReceiverError && showIdError;
    return (_jsxs(StyledSendMenu, { "$inputError": showIdError, children: [_jsxs("div", { className: "sendMenu", style: {
                    borderColor: errorCondition ? '#ba5d5d' : '#000000',
                }, children: [_jsx("div", { className: "title", children: title }), _jsx("div", { className: "options", children: sortedMembers.value.map((m, i) => (_jsx("div", { className: "name", style: {
                                backgroundColor: id === m.id ? 'white' : '',
                                color: id === m.id ? '#26272B' : '',
                            }, onClick: () => {
                                setId(m.id);
                                setShowIdError(false);
                            }, children: m.id === userMemberId ? 'You' : m.name }, i))) })] }), _jsx("span", { className: "errorMsg", children: errorCondition ? idError.error : '' })] }));
};
export default SendMenuWrapper;
