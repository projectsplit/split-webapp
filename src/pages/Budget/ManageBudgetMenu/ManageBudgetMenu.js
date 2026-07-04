import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledManageBudgetMenu } from './ManageBudgetMenu.styled';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../components/MyButton/MyButton';
export default function ManageBudgetMenu({ menu, selectedBudget }) {
    const navigate = useNavigate();
    return (_jsxs(StyledManageBudgetMenu, { children: [_jsxs("div", { className: "header", children: [' ', _jsx("strong", { children: "Manage Budget" })] }), _jsx(MyButton, { onClick: () => {
                    navigate('/budget/create', { state: { editBudget: selectedBudget } });
                    menu.value = null;
                }, fontSize: "16", children: _jsxs("div", { className: "iconAndTextContainer", children: [_jsx(AiFillEdit, { className: "icon" }), _jsx("div", { className: "text", children: "Edit Budget" })] }) }), _jsx(MyButton, { fontSize: "16", onClick: () => (menu.value = 'deleteBudgetConfirmation'), children: _jsxs("div", { className: "iconAndTextContainer", children: [_jsx(AiFillDelete, { className: "icon" }), _jsx("div", { className: "text", children: "Delete Budget" })] }) })] }));
}
