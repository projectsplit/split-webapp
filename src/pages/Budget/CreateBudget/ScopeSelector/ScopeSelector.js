import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledScopeSelector } from './ScopeSelector.styled';
import { useSignal } from '@preact/signals-react';
import { useMemo } from 'react';
import { scopeBuilder } from '../helpers/scopeBuilder';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import InfoBoxAnimation from '@/components/Animations/InfoBoxAnimation';
import ScopeInfo from './ScopeInfo/ScopeInfo';
export const ScopeSelector = ({ onClick, scopeState, targetGroupIds, allGroupsSelected, $inputError, }) => {
    const scopeDetails = useMemo(() => {
        return scopeBuilder(scopeState, allGroupsSelected, targetGroupIds);
    }, [scopeState.value, allGroupsSelected.value, targetGroupIds.value]);
    const menu = useSignal(null);
    return (_jsxs(StyledScopeSelector, { "$inputError": $inputError, children: [_jsxs("div", { className: "spendingCycleHeader", children: [_jsx("div", { className: "prompt", children: "Scope" }), _jsx(IonIcon, { onClick: () => (menu.value = 'infoBox'), name: "information-circle-outline", className: "information" })] }), _jsx("button", { className: "scopeSelector", onClick: onClick, children: scopeDetails.text }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(InfoBoxAnimation, { menu: menu, children: _jsx(ScopeInfo, { menu: menu }) })] }));
};
