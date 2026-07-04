import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledBarWithLegends } from './BarsWithLegends.styled';
import { BarsAndAmounts } from './BarsAndAmounts/BarsAndAmounts';
import { Mode } from '@/types';
export default function BarsWithLegends({ bar1Total, bar2Total, currency, bar1Legend, bar2Legend, bar1Color, bar2Color, onClick, mode, }) {
    return (_jsxs(StyledBarWithLegends, { children: [' ', mode !== Mode.Personal && (_jsxs("div", { className: "legends", children: [_jsxs("div", { className: "grouping", children: [_jsx("div", { className: "legendGroup", style: { backgroundColor: bar1Color } }), _jsx("div", { className: "descr", children: bar1Legend })] }), _jsxs("div", { className: "grouping", children: [_jsx("div", { className: "legendUser", style: { backgroundColor: bar2Color } }), _jsx("div", { className: "descr", children: bar2Legend })] })] })), _jsx(BarsAndAmounts, { mode: mode, onClick: onClick, currency: currency, bar1Total: bar1Total, bar2Total: bar2Total, bar1Color: bar1Color, bar2Color: bar2Color })] }));
}
