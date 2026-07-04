import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import FormInput from '@/components/FormInput/FormInput';
import { ScopeSelector } from '../ScopeSelector/ScopeSelector';
export const SecondPage = ({ data, actions, scopeMenu }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "errorsWrapper", children: [_jsx(ScopeSelector, { onClick: () => {
                            scopeMenu.value = 'scopeSelector';
                            actions.setError('scopeError', '');
                            actions.setError('showScopeError', false);
                        }, scopeState: data.scopeState, targetGroupIds: data.targetGroupIds, allGroupsSelected: data.allGroupsSelected, "$inputError": data.errors.showScopeError && !!data.errors.scopeError }), _jsx("span", { className: "errorMsg", children: data.errors.showScopeError && data.errors.scopeError
                            ? data.errors.scopeError
                            : '' })] }), _jsx("div", { className: "errorsWrapper", children: _jsx(FormInput, { description: "", placeholder: "Description", value: data.description, onChange: (e) => {
                        actions.setDescription(e.target.value);
                        actions.setError('descriptionError', '');
                        actions.setError('showDescriptionError', false);
                    }, error: data.errors.showDescriptionError ? data.errors.descriptionError : '' }) })] }));
};
