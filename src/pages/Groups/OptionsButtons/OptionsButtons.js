import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MdGroupOff } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { IoIosArchive } from 'react-icons/io';
import { StyledOptionsButtons } from './OptionsButtons.styled';
export default function OptionsButtons({ activeGroupCatAsState, generalRef, setKeyword, showSearchBar, }) {
    return (_jsxs(StyledOptionsButtons, { "$groupState": activeGroupCatAsState.value, children: [_jsxs("div", { className: "buttonWrapper", ref: generalRef, children: [activeGroupCatAsState.value === 'NonGroup' && (_jsx("div", { className: "activeBar" })), _jsxs("div", { className: "button", onClick: () => {
                            setKeyword('');
                            activeGroupCatAsState.value = 'NonGroup';
                            showSearchBar.value = false;
                        }, children: [_jsx(MdGroupOff, { className: "groupIcon non" }), _jsx("span", { className: "descr", children: "Non" }), _jsx("span", { className: "descr", children: "Group" })] })] }), _jsxs("div", { className: "buttonWrapper", ref: generalRef, children: [activeGroupCatAsState.value === 'Active' && (_jsx("div", { className: "activeBar" })), _jsxs("div", { className: "button", onClick: () => {
                            setKeyword('');
                            activeGroupCatAsState.value = 'Active';
                            showSearchBar.value = false;
                        }, children: [_jsx(TiGroup, { className: "groupIcon active" }), _jsx("span", { className: "descr", children: "Active" }), _jsx("span", { className: "descr", children: "Groups" })] })] }), _jsxs("div", { className: "buttonWrapper", ref: generalRef, children: [activeGroupCatAsState.value === 'Archived' && (_jsx("div", { className: "activeBar" })), _jsxs("div", { className: "button", onClick: () => {
                            setKeyword('');
                            activeGroupCatAsState.value = 'Archived';
                            showSearchBar.value = false;
                        }, children: [_jsx(IoIosArchive, { className: "groupIcon archived" }), _jsx("span", { className: "descr", children: "Archived " }), _jsx("span", { className: "descr", children: "Groups" })] })] })] }));
}
