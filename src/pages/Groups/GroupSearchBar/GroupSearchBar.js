import { jsx as _jsx } from "react/jsx-runtime";
import { StyledGroupSearchBar } from './GroupSearchBar.styled';
export default function GroupSearchBar({ autoFocus = false, keyword, setKeyword, }) {
    return (_jsx(StyledGroupSearchBar, { placeholder: "Search groups...", autoFocus: autoFocus, value: keyword, onChange: (e) => setKeyword(e.target.value) }));
}
