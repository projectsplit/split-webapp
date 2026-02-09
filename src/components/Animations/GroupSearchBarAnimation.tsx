import { CSSTransition } from "react-transition-group";
import { GroupSearchBarAnimationProps } from "../../interfaces";
import GroupSearchBar from "../../pages/Groups/GroupSearchBar/GroupSearchBar";

export default function GroupSearchBarAnimation({
  showSearchBar,
  searchBarRef,
  keyword,
  setKeyword,
}: GroupSearchBarAnimationProps) {
  return (
    /* @ts-ignore */
    <CSSTransition
      in={showSearchBar.value}
      timeout={300}
      classNames="search"
      unmountOnExit
      nodeRef={searchBarRef}
    >
      <div ref={searchBarRef} className="searchWrapper">
        <GroupSearchBar
          autoFocus
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </div>
    </CSSTransition>
  );
}
