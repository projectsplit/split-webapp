import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mode } from '@/types';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { StyledBarsAndAmounts } from './BarsAndAmounts.styled';
export const BarsAndAmounts = ({ onClick, currency, bar1Total, bar2Total, bar1Color, bar2Color, mode, }) => {
    const scalingFactor = 0.05;
    const bar1Width = bar1Total * scalingFactor;
    const bar2Width = bar2Total * scalingFactor;
    const bar1WidthPercentage = bar1Width / (bar1Width + bar2Width);
    const bar2WidthPercentage = bar2Width / (bar1Width + bar2Width);
    return (_jsxs(StyledBarsAndAmounts, { onClick: onClick, children: [mode !== Mode.Personal && (_jsxs("div", { className: "barAndAmount", children: [_jsx("div", { className: "bar1", style: {
                            width: `${bar1WidthPercentage * 100}%`,
                            transition: 'width 0.5s ease',
                            backgroundColor: bar1Color,
                        } }), _jsx("div", { className: "amount", children: displayCurrencyAndAmount(bar1Total.toString(), currency) })] })), _jsxs("div", { className: "barAndAmount", children: [_jsx("div", { className: "bar2", style: {
                            width: `${bar2WidthPercentage * 100}%`,
                            transition: 'width 0.5s ease',
                            backgroundColor: bar2Color,
                        } }), _jsx("div", { className: "amount", children: displayCurrencyAndAmount(bar2Total.toString(), currency) })] })] }));
};
