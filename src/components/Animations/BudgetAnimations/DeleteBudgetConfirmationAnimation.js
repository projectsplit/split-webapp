import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import ConfirmationForBudgetDeletion from '../../../pages/Budget/ConfirmationForBudgetDeletion/ConfirmationForBudgetDeletion';
export default function DeleteBudgetConfirmationAnimation({ menu, deleteBudget, selectedBudget, isLoading }) {
    return (_jsx(CSSTransition, { in: menu.value === 'deleteBudgetConfirmation', timeout: 100, classNames: "bottomslide", unmountOnExit: true, children: _jsx(ConfirmationForBudgetDeletion, { isLoading: isLoading, menu: menu, deleteBudget: deleteBudget, selectedBudget: selectedBudget }) }));
}
