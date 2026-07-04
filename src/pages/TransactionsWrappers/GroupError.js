import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RiWifiOffLine } from 'react-icons/ri';
import MyButton from '../../components/MyButton/MyButton';
import { MdOutlineGroupOff, MdOutlineTimerOff } from 'react-icons/md';
import { LuServerOff } from 'react-icons/lu';
const GroupError = ({ groupError }) => {
    if (groupError?.value?.code === 'ERR_NETWORK') {
        return (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "Unable to connect to the server. Please check your connection" }), _jsx(RiWifiOffLine, { className: "icon" })] }), _jsx("div", { className: "retry", children: _jsx(MyButton, { onClick: () => window.location.reload(), children: "Retry" }) })] }));
    }
    if (groupError?.value?.code === 'ERR_CANCELED') {
        return (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "Request timed out or was canceled. Please try again" }), _jsx(MdOutlineTimerOff, { className: "icon" })] }), _jsx("div", { className: "retry", children: _jsx(MyButton, { onClick: () => window.location.reload(), children: "Retry" }) })] }));
    }
    if (groupError?.value &&
        typeof groupError.value.status === 'number' &&
        groupError.value.status >= 500) {
        return (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "Server error. Please try again later" }), _jsx(LuServerOff, { className: "icon" })] }), _jsx("div", { className: "retry", children: _jsx(MyButton, { onClick: () => window.location.reload(), children: "Retry" }) })] }));
    }
    if (groupError?.value &&
        typeof groupError.value.status === 'number' &&
        groupError.value.status === 404) {
        return (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "No Group was found" }), _jsx(MdOutlineGroupOff, { className: "icon" })] }), _jsx("div", { className: "bottomMenu" })] }));
    }
    return null;
};
export default GroupError;
