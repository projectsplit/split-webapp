import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { BarsAndAmounts } from '../../../components/BarsWithLegends/BarsAndAmounts/BarsAndAmounts';
import { StyledGroupTotalsByCurrency } from './GroupTotalsByCurrency.styled';
import { Mode } from '@/types';
export const GroupTotalsByCurrency = ({ menu, bar1Color, bar2Color, bar1Legend, bar2Legend, groupTotalsByCurrency, userTotalsByCurrency, mode, }) => {
    const allCurrencies = Array.from(new Set([
        ...Object.keys(groupTotalsByCurrency),
        ...Object.keys(userTotalsByCurrency),
    ]));
    return (_jsxs(StyledGroupTotalsByCurrency, { children: [_jsxs("div", { className: "header", children: [_jsx("span", { children: "By Currency" }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsxs("div", { className: "legends", children: [mode !== Mode.Personal && (_jsxs("div", { className: "grouping", children: [_jsx("div", { className: "legendGroup", style: { backgroundColor: bar1Color } }), _jsx("div", { className: "descr", children: bar1Legend })] })), _jsxs("div", { className: "grouping", children: [_jsx("div", { className: "legendUser", style: { backgroundColor: bar2Color } }), _jsx("div", { className: "descr", children: bar2Legend })] })] }), allCurrencies.map((currency) => (_jsx(BarsAndAmounts, { currency: currency, bar1Total: groupTotalsByCurrency[currency] || 0, bar2Total: userTotalsByCurrency[currency] || 0, bar1Color: bar1Color, bar2Color: bar2Color, mode: mode }, currency)))] }));
};
