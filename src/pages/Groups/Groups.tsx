import { StyledGroupsContainer } from "./GroupsContainer.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
import CreateGroupAnimation from "../../components/Animations/CreateGroupAnimation";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMostRecentGroup } from "../../api/auth/CommandHooks/useMostRecentContext";
import { StyledGroups } from "./GroupTypes/Groups.styled";
import { MdOutlineGroupOff } from "react-icons/md";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Sentinel from "../../components/Sentinel";
import { TreeItemBuilderForHomeAndGroups } from "../../components/TreeItemBuilderForHomeAndGroups";
import { GoArchive } from "react-icons/go";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import ConfirmUnArchiveGroupAnimation from "../../components/Animations/ConfirmUnArchiveGroupAnimation";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import Spinner from "../../components/Spinner/Spinner";
import { useGetGroupsTotalAmounts } from "@/api/auth/QueryHooks/useGetGroupsTotalAmounts";

export default function Groups() {
  const queryClient = useQueryClient();
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);
  const groupIdClicked = useSignal<string>("");

  const {
    topMenuTitle,
    activeGroupCatAsState,
    openGroupOptionsMenu,

  } = useOutletContext<{
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
    isGroupArchived: boolean,
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
    <StyledGroupsContainer>
      <CategorySelector
        activeCat={activeGroupCatAsState.value}
        categories={{
          cat1: "Active",
          cat2: "Archived",
        }}
        navLinkUse={false}
        activeCatAsState={activeGroupCatAsState}
      />
      <StyledGroups>
        {isFetching && !isFetchingNextPage ? (
          <Spinner />
        ) : (
          <div className="groups">
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
                    activeGroupCatAsState.value === "Archived" ? "#D79244" : ""
                  }
                  onIconClick={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) =>
                    onIconClick(
                      e,
                      g.id,
                      activeGroupCatAsState.value === "Archived",
                    )
                  }
                >
                  <div className="groupName">{g.name}</div>
                </TreeAdjustedContainer>
              </div>
            ))}

            <Sentinel
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        )}
      </StyledGroups>
      <MenuAnimationBackground menu={menu} />
      <BottomMainMenu onClick={() => (menu.value = "createGroup")} />
      <CreateGroupAnimation menu={menu} currencyMenu={currencyMenu} />
      <ConfirmUnArchiveGroupAnimation
        menu={menu}
        groupId={groupIdClicked.value}
        openGroupOptionsMenu={openGroupOptionsMenu}
        navigateToGroups={true}
      />
    </StyledGroupsContainer>
  );
}
