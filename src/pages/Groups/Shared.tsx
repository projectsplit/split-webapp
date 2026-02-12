import { useNavigate, useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import CreateGroupAnimation from "../../components/Animations/CreateGroupAnimation";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMostRecentGroup } from "../../api/auth/CommandHooks/useMostRecentGroup";
import { StyledGroups } from "./GroupTypes/Groups.styled";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Sentinel from "../../components/Sentinel";
import { TreeItemBuilderForHomeAndGroups } from "../../components/TreeItemBuilderForHomeAndGroups";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import ConfirmUnArchiveGroupAnimation from "../../components/Animations/ConfirmUnArchiveGroupAnimation";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import Spinner from "../../components/Spinner/Spinner";
import { StyledSharedContainer } from "./SharedContainer.styled";
import Separator from "../../components/Separator/Separator";
import VerticalSeparator from "../../components/VerticalSeparator/VerticalSeparator";
import GroupSearchBarAnimation from "../../components/Animations/GroupSearchBarAnimation";
import useDebounce from "@/hooks/useDebounce";
import NoGroupsFound from "./NoGroupsFound/NoGroupsFound";
import OptionsButtons from "./OptionsButtons/OptionsButtons";
import { TransactionType, UserInfo } from "@/types";
import { computeNetPerCurrency } from "@/helpers/computeNetPerCurrency";
import { useGroupsList } from "./hooks/useGroupList";
import { useNonGroupDebts } from "./hooks/useNonGroupDebts";

export default function Shared() {
  const queryClient = useQueryClient();
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);
  const groupIdClicked = useSignal<string>("");
  const showSearchBar = useSignal(false);
  const searchBarRef = useRef<any>(null);
  const generalRef = useRef<any>(null);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(
    keyword.length > 1 ? keyword : "",
    400
  );

  const { topMenuTitle, activeGroupCatAsState, openGroupOptionsMenu, userInfo } =
    useOutletContext<{
      topMenuTitle: Signal<string>;
      openGroupOptionsMenu: Signal<boolean>;
      activeGroupCatAsState: Signal<string>;
      userInfo: UserInfo;
    }>();

  const navigate = useNavigate();
  const pageSize = 10;

const {
  filteredGroups,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching: isFetchingGroups,
} = useGroupsList(pageSize, debouncedKeyword, activeGroupCatAsState);

const {
  groupedTransactions,
  isFetchingDebts,
} = useNonGroupDebts(userInfo?.userId || "",activeGroupCatAsState.value as TransactionType);


  useEffect(() => {
    if (!showSearchBar.value) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node) && generalRef.current && !generalRef.current.contains(e.target as Node)) { showSearchBar.value = false; setKeyword("") }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchBar.value]);

  useEffect(() => {
    topMenuTitle.value = "Shared";
    queryClient.invalidateQueries({
      queryKey: ["shared", activeGroupCatAsState.value.toLowerCase()],
    });
  }, [activeGroupCatAsState.value]);


  const updateMostRecentGroupId = useMostRecentGroup();

  const onGroupClickHandler = (id: string, groupName: string) => {
    navigate(`/shared/${id}/expenses`, { state: { groupName } });
    updateMostRecentGroupId.mutate(id);
  };

  const onIconClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    groupId: string,
    isGroupArchived: boolean
  ) => {
    if (!isGroupArchived) {
      e.stopPropagation();
      navigate(`/shared/generatecode/${groupId}`);
    } else {
      e.stopPropagation();
      groupIdClicked.value = groupId;
      menu.value = "unarchiveGroup";
    }
  };

  return (
    <StyledSharedContainer $groupState={activeGroupCatAsState.value}>
      <Separator />
      <div className="optionButtonsAndGroups">
        <OptionsButtons activeGroupCatAsState={activeGroupCatAsState} generalRef={generalRef} setKeyword={setKeyword} showSearchBar={showSearchBar} />
        <VerticalSeparator />
        <StyledGroups>
          <GroupSearchBarAnimation
            showSearchBar={showSearchBar}
            searchBarRef={searchBarRef}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          {(isFetchingGroups && !isFetchingNextPage) ||isFetchingDebts? (
            <Spinner />
          ) : (
            <div className="groups">
              <NoGroupsFound activeGroupCatAsState={activeGroupCatAsState} filteredGroups={filteredGroups} keyword={keyword} />
              {filteredGroups?.map((g: any) => (
                <div key={g.id}>
                  <TreeAdjustedContainer
                    onClick={() => onGroupClickHandler(g.id, g.name)}
                    hasOption={true}
                    optionname={
                      activeGroupCatAsState.value === "Archived"
                        ? "arrow-undo-outline"
                        : "qr-code"
                    }
                    iconfontsize={30}
                    right={0.8}
                    items={TreeItemBuilderForHomeAndGroups(g?.details)}
                    $optionColor={
                      activeGroupCatAsState.value === "Archived"
                        ? "#D79244"
                        : ""
                    }
                    onIconClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) =>
                      onIconClick(
                        e,
                        g.id,
                        activeGroupCatAsState.value === "Archived"
                      )
                    }
                  >
                    <div className="groupName">{g.name}</div>
                  </TreeAdjustedContainer>
                </div>
              ))}
              {activeGroupCatAsState.value === "NonGroup" && (
                <TreeAdjustedContainer
                  onClick={() => navigate(`/shared/nongroup/expenses`)}
                  hasOption={true}
                  items={TreeItemBuilderForHomeAndGroups(computeNetPerCurrency(groupedTransactions, userInfo.userId || ""))}
                  optionname={'chevron-forward-outline'}
                >
                  <div className="groupName">Non Group transactions</div>
                </TreeAdjustedContainer>
              )}
              <Sentinel
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          )}
        </StyledGroups>
      </div>
      <MenuAnimationBackground menu={menu} />
      <BottomMainMenu onClick={() => (menu.value = "createGroup")} onGroupSearchClick={() => { activeGroupCatAsState.value !== "NonGroup" ? showSearchBar.value = true : null }} bottomBarRef={generalRef} />
      <CreateGroupAnimation menu={menu} currencyMenu={currencyMenu} />
      <ConfirmUnArchiveGroupAnimation
        menu={menu}
        groupId={groupIdClicked.value}
        openGroupOptionsMenu={openGroupOptionsMenu}
        navigateToGroups={true}
      />
    </StyledSharedContainer>
  );
}


