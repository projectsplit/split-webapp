import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { StyledLongPressMenu } from './LongPressMenu.styled';
export default function LongPressMenu({ onEdit, onDelete, onClose, }) {
    return (_jsxs(StyledLongPressMenu, { children: [_jsx("div", { className: "backdrop", onClick: onClose }), _jsxs("div", { className: "sheet", children: [_jsx("div", { className: "handle" }), onEdit && (_jsxs("button", { className: "option edit", onClick: () => {
                            onClose();
                            onEdit();
                        }, children: [_jsx(AiFillEdit, { className: "icon" }), _jsx("span", { children: "Edit" })] })), _jsxs("button", { className: "option delete", onClick: () => {
                            onClose();
                            onDelete();
                        }, children: [_jsx(AiFillDelete, { className: "icon" }), _jsx("span", { children: "Delete" })] })] })] }));
}
