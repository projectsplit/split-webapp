import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledTreeAdjustedContainer } from './TreeAdjustedContainer.styled';
import Tree from '../Tree/Tree';
import OptionsContainer from '../OptionsContainer/OptionsContainer';
import IonIcon from '@reacticons/ionicons';
export default function TreeAdjustedContainer({ children, onClick, hasOption, optionname, items, iconfontsize, right, onIconClick, $optionColor, }) {
    const hasTreeComponent = items.length > 1 ? true : false;
    if (!hasTreeComponent) {
        return (_jsxs(OptionsContainer, { onClick: onClick, hasOption: hasOption, optionname: optionname, iconfontsize: iconfontsize, right: right, onIconClick: onIconClick, "$optionColor": $optionColor, children: [children, items.map((item, index) => (_jsx("div", { children: item }, index)))] }));
    }
    return (_jsxs(StyledTreeAdjustedContainer, { onClick: onClick, hasOption: hasOption, optionname: optionname, iconfontsize: iconfontsize, right: right, "$optionColor": $optionColor, children: [children, hasOption && (_jsx(IonIcon, { name: optionname, className: "arrow", onClick: onIconClick })), _jsx(Tree, { items: items })] }));
}
