import { StyledGroupsContainer } from "./GroupsContainer.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import CreateGroupAnimation from "../../components/Animations/CreateGroupAnimation";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMostRecentGroup } from "../../api/auth/CommandHooks/useMostRecentGroup";
import { StyledGroups } from "./GroupTypes/Groups.styled";
import { MdGroupOff, MdOutlineGroupOff } from "react-icons/md";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Sentinel from "../../components/Sentinel";
import { TreeItemBuilderForHomeAndGroups } from "../../components/TreeItemBuilderForHomeAndGroups";
import { GoArchive } from "react-icons/go";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import ConfirmUnArchiveGroupAnimation from "../../components/Animations/ConfirmUnArchiveGroupAnimation";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import Spinner from "../../components/Spinner/Spinner";
import { StyledSharedContainer } from "./SharedContainer.styled";
import Separator from "../../components/Separator/Separator";
import VerticalSeparator from "../../components/VerticalSeparator/VerticalSeparator";
import { TiGroup } from "react-icons/ti";
import { IoIosArchive } from "react-icons/io";
import { useGetGroupsTotalAmounts } from "@/api/auth/QueryHooks/useGetGroupsTotalAmounts";
import GroupSearchBarAnimation from "../../components/Animations/GroupSearchBarAnimation";

export default function Shared() {
  const queryClient = useQueryClient();
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);
  const groupIdClicked = useSignal<string>("");
  const showSearchBar = useSignal(false);
  const searchBarRef = useRef<any>(null);
  const bottomBarRef = useRef<any>(null);

  const { topMenuTitle, activeGroupCatAsState, openGroupOptionsMenu } =
    useOutletContext<{
      topMenuTitle: Signal<string>;
      openGroupOptionsMenu: Signal<boolean>;
      activeGroupCatAsState: Signal<string>;
    }>();

  const navigate = useNavigate();
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetGroupsTotalAmounts(pageSize, activeGroupCatAsState);

  const groups = data?.pages.flatMap((p) => p.groups);
  const filteredGroups = groups?.filter((g) =>
    activeGroupCatAsState.value === "Active" ? !g.isArchived : g.isArchived
  );

  useEffect(() => {
    if (!showSearchBar.value) return;

    const handleClickOutside = (e: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node) && bottomBarRef.current && !bottomBarRef.current.contains(e.target as Node)) { showSearchBar.value = false; }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchBar.value]);

  useEffect(() => {
    topMenuTitle.value = "Shared";
    queryClient.invalidateQueries({
      queryKey: ["shared", activeGroupCatAsState.value.toLowerCase()],
      exact: true,
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
        <div className="optionButtons">
          <div className="buttonWrapper">
            {activeGroupCatAsState.value === "NonGroup" && (
              <div className="activeBar" />
            )}
            <div
              className="button"
              onClick={() => (activeGroupCatAsState.value = "NonGroup")}
            >
              <MdGroupOff className="groupIcon non" />
              <span className="descr">Non</span>
              <span className="descr">Group</span>
            </div>
          </div>
          <div className="buttonWrapper">
            {activeGroupCatAsState.value === "Active" && (
              <div className="activeBar" />
            )}
            <div
              className="button"
              onClick={() => (activeGroupCatAsState.value = "Active")}
            >
              <TiGroup className="groupIcon active" />
              <span className="descr">Active</span>
              <span className="descr">Groups</span>
            </div>
          </div>

          <div className="buttonWrapper">
            {activeGroupCatAsState.value === "Archived" && (
              <div className="activeBar" />
            )}

            <div
              className="button"
              onClick={() => (activeGroupCatAsState.value = "Archived")}
            >
              <IoIosArchive className="groupIcon archived" />
              <span className="descr">Archived </span>
              <span className="descr">Groups</span>
            </div>
          </div>
        </div>
        <VerticalSeparator />
        <StyledGroups>
          {isFetching && !isFetchingNextPage ? (
            <Spinner />
          ) : (
            <div className="groups">
              <GroupSearchBarAnimation
                showSearchBar={showSearchBar}
                searchBarRef={searchBarRef}
              />
              {groups?.length === 0 ? (
                activeGroupCatAsState.value === "Active" ? (
                  <div className="noData">
                    <div className="msg">
                      There are currently no active groups
                    </div>
                    <MdOutlineGroupOff className="icon" />
                  </div>
                ) : (
                  <div className="noData">
                    <div className="msg">
                      There are currently no archived groups
                    </div>
                    <GoArchive className="icon" />
                  </div>
                )
              ) : null}
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
                  items={[
                    <div className="groupsInfo" key="settled">
                      <div className="settled">
                        <div>You are settled </div>
                        {/* <IonIcon name="checkmark-sharp" className="checkmark" /> */}
                      </div>
                    </div>,
                  ]}
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
      <BottomMainMenu onClick={() => (menu.value = "createGroup")} onGroupSearchClick={() => {activeGroupCatAsState.value !== "NonGroup" ? showSearchBar.value = true : null}} bottomBarRef={bottomBarRef} />
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


