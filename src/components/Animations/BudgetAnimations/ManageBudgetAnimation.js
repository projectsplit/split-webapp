import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import ManageBudgetMenu from '../../../pages/Budget/ManageBudgetMenu/ManageBudgetMenu';
import { useRef } from 'react';
export default function ManageBudgetAnimation({ menu, selectedBudget, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'manageBudgetMenu', timeout: 100, classNames: "bottomslide", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(ManageBudgetMenu, { menu: menu, selectedBudget: selectedBudget }) }));
}
