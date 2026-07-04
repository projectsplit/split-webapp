import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import GroupSearchBar from '../../pages/Groups/GroupSearchBar/GroupSearchBar';
export default function GroupSearchBarAnimation({ showSearchBar, searchBarRef, keyword, setKeyword, }) {
    return (_jsx(CSSTransition, { in: showSearchBar.value, timeout: 300, classNames: "search", unmountOnExit: true, nodeRef: searchBarRef, children: _jsx("div", { ref: searchBarRef, className: "searchWrapper", children: _jsx(GroupSearchBar, { autoFocus: true, keyword: keyword, setKeyword: setKeyword }) }) }));
}
