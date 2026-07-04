import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GoHomeFill } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { StyledBottomMainMenu } from './BottomMainMenu.styled';
import { RiProhibited2Line } from 'react-icons/ri';
export default function BottomMainMenu({ onClick, group, menu, onGroupSearchClick, bottomBarRef, }) {
    const navigate = useNavigate();
    return (_jsx(StyledBottomMainMenu, { className: "bottom-bar", "$groupIsArchived": group && group.isArchived, children: _jsxs("div", { className: "bottomMainBar", children: [_jsx("div", { className: "home", onClick: () => navigate('/'), children: _jsx(GoHomeFill, {}) }), group && group.isArchived ? (_jsx("div", { className: "add", onClick: onClick, children: _jsx(RiProhibited2Line, { className: "prohibited" }) })) : (_jsx("div", { className: "add", onClick: onClick, children: _jsx(FaPlus, {}) })), _jsx("div", { className: "search", onClick: onGroupSearchClick, ref: bottomBarRef, children: _jsx(IoMdSearch, { onClick: () => {
                            if (menu) {
                                menu.value = 'search';
                            }
                        } }) })] }) }));
}
