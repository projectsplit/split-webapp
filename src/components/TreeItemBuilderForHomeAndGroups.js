import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { joinAmounts } from '../helpers/joinAmounts';
export const TreeItemBuilderForHomeAndGroups = (details) => {
    if (!details)
        return [];
    const filteredDetails = Object.fromEntries(Object.entries(details).filter(([_, amount]) => amount !== 0));
    if (Object.keys(filteredDetails).length === 0) {
        return [
            _jsx("div", { className: "groupsInfo", children: _jsxs("div", { className: "settled", children: [_jsx("div", { children: "You are settled " }), _jsx(IonIcon, { name: "checkmark-sharp", className: "checkmark" })] }) }, "settled"),
        ];
    }
    const positiveEntries = Object.entries(filteredDetails).filter(([, amount]) => amount > 0);
    const negativeEntries = Object.entries(filteredDetails).filter(([, amount]) => amount < 0);
    const components = [];
    if (positiveEntries.length > 0) {
        components.push(_jsxs("div", { className: "groupsInfo", children: [_jsx("span", { children: "You owe " }), _jsx("span", { className: "owe", children: joinAmounts(positiveEntries) })] }, "positive"));
    }
    if (negativeEntries.length > 0) {
        components.push(_jsxs("div", { className: "groupsInfo", children: [_jsx("span", { children: "You are owed " }), _jsx("span", { className: "owed", children: joinAmounts(negativeEntries) })] }, "negative"));
    }
    return components;
};
