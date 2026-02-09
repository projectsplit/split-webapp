import { StyledGroupSearchBar } from "./GroupSearchBar.styled";

interface GroupSearchBarProps {
  autoFocus?: boolean;
}

export default function GroupSearchBar({ autoFocus = false }: GroupSearchBarProps) {
  return (
    <StyledGroupSearchBar placeholder="Search groups..." autoFocus={autoFocus} />
  );
}