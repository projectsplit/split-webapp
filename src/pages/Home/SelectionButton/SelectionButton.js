import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledSelectionButton } from './SelectionButton.styled';
import OptionsContainer from '../../../components/OptionsContainer/OptionsContainer';
export default function SelectionButton({ children, name, description, onClick, hasArrow, }) {
    return (_jsx(StyledSelectionButton, { onClick: onClick, children: _jsx(OptionsContainer, { hasOption: hasArrow, optionname: "chevron-forward-outline", children: _jsxs("div", { className: "main", children: [children, _jsxs("div", { className: "confing", children: [_jsx("div", { className: "name", children: name }), _jsx("div", { className: "descr", children: description })] })] }) }) }));
}
