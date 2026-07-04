import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import ConfirmationForBudgetSubmission from '../../../pages/Budget/ConfirmationForBudgetSubmission/ConfirmationForBudgetSubmission';
export default function CreateBudgetConfirmationAnimation({ menu, submitBudget, }) {
    return (_jsx(CSSTransition, { in: menu.value === 'createBudgetConfirmation', timeout: 100, classNames: "bottomslide", unmountOnExit: true, children: _jsx(ConfirmationForBudgetSubmission, { menu: menu, submitBudget: submitBudget }) }));
}
