import { StyledGroupSearchBar } from "./GroupSearchBar.styled";

interface GroupSearchBarProps {
  autoFocus?: boolean;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export default function GroupSearchBar({ autoFocus = false, keyword, setKeyword }: GroupSearchBarProps) {
  return (
    <StyledGroupSearchBar placeholder="Search groups..." autoFocus={autoFocus} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
  );
}