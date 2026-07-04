import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TiGroup } from 'react-icons/ti';
import { StyledNonGroupMenu } from './NonGroupMenu.styled';
export const NonGroupMenu = ({ $noReceiverSelected, $isSamePersonError, data, actions, fromHome, nonGroupMenu, }) => {
    return (_jsxs(StyledNonGroupMenu, { "$noReceiverSelected": $noReceiverSelected, "$isSamePersonError": $isSamePersonError, children: [_jsxs("div", { className: "nonGroupMenu", children: [_jsxs("div", { className: "textAndButton", children: [_jsx("div", { className: "text", children: " Sent from " }), _jsx("div", { className: "button senderButton", onClick: () => {
                                    nonGroupMenu.value = {
                                        ...nonGroupMenu.value,
                                        attribute: 'sender',
                                        menu: 'nonGroupTransfer',
                                    };
                                    actions.setError('showSamePersonError', false);
                                    actions.setError('isSameUserError', '');
                                    actions.setError('showIdError', false);
                                }, children: nonGroupMenu.value.senderName }), ' '] }), _jsxs("div", { className: "textAndButton", children: [_jsx("div", { className: "text", children: " and received by " }), _jsx("div", { className: "button receiverButton", onClick: () => {
                                    nonGroupMenu.value = {
                                        ...nonGroupMenu.value,
                                        attribute: 'receiver',
                                        menu: 'nonGroupTransfer',
                                    };
                                    actions.setError('showSamePersonError', false);
                                    actions.setError('isSameUserError', '');
                                    actions.setError('showIdError', false);
                                }, children: nonGroupMenu.value.receiverName === ''
                                    ? 'select user'
                                    : nonGroupMenu.value.receiverName })] })] }), _jsxs("span", { className: "errorMsg", children: [data.errors.showAmountError && data.errors.isSameUserError
                        ? data.errors.isSameUserError
                        : '', data.errors.showIdError && data.errors.idErrorMessage
                        ? data.errors.idErrorMessage
                        : ''] }), fromHome && (_jsx("div", { className: "buttonWrapper", children: _jsxs("div", { className: "groupButton", onClick: () => {
                        actions.setError('showAmountError', false);
                        actions.setError('showIdError', false);
                        nonGroupMenu.value = {
                            ...nonGroupMenu.value,
                            attribute: 'groups',
                            menu: 'nonGroupTransfer',
                        };
                    }, children: [_jsx(TiGroup, { className: "groupIcon" }), _jsx("span", { className: "descr", children: "Groups" })] }) }))] }));
};
