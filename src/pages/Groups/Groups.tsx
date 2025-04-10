import { StyledGroupsContainer } from "./GroupsContainer.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
// import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import CreateGroupAnimation from "../../components/Menus/MenuAnimations/CreateGroupAnimation";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useEffect } from "react";
import { UserInfo } from "../../types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupsTotalAmounts } from "../../api/services/api";
import { useMostRecentGroup } from "../../api/services/useMostRecentGroup";
import { StyledGroups } from "./GroupTypes/Groups.styled";
import Spinner from "../../components/Spinner/Spinner";
import { MdOutlineGroupOff } from "react-icons/md";
import TreeAdjustedContainer from "../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Sentinel from "../../components/Sentinel";
import { TreeItemBuilderForHomeAndGroups } from "../../components/TreeItemBuilderForHomeAndGroups";
import { GoArchive } from "react-icons/go";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";

export default function Groups() {
  const queryClient = useQueryClient();
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);

  const { topMenuTitle,activeGroupCatAsState } = useOutletContext<{
    topMenuTitle: Signal<string>;
    userInfo: UserInfo;
    openGroupOptionsMenu: Signal<boolean>;
    activeGroupCatAsState:Signal<string>;
  }>();

  const navigate = useNavigate();
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groups", activeGroupCatAsState.value.toLowerCase()],
      queryFn: ({ pageParam: next }) =>
        getGroupsTotalAmounts(
          pageSize,
          next,
          activeGroupCatAsState.value === "Archived"
        ),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });

  // useEffect(() => {
  //   queryClient.invalidateQueries({
  //     queryKey: ["groups", "active"],
  //     exact: true,
  //   });
  //   queryClient.invalidateQueries({
  //     queryKey: ["groups", "archived"],
  //     exact: true,
  //   });
  // }, [activeGroupCatAsState.value]);

    useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["groups", "active"],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: ["groups", "archived"],
      exact: true,
    });
  }, []);
 
  const groups = data?.pages.flatMap((p) => p.groups);
  const updateMostRecentGroupId = useMostRecentGroup();

  const onGroupClickHandler = (id: string, groupName: string) => {
    navigate(`/groups/${id}/expenses`, { state: { groupName } });
    updateMostRecentGroupId.mutate(id);
  };

  useEffect(() => {
    topMenuTitle.value = "Groups";
  }, []);

  const filteredGroups = groups?.filter((g) =>
    activeGroupCatAsState.value === "Active" ? !g.isArchived : g.isArchived
  );
  
//TODO when backend is ready try to remove activeGroupCatAsState.value.toLowerCase() from dependency

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
                  hasOption={false}
                  optionname={
                    activeGroupCatAsState.value === "Archived"
                      ? "file-tray-full-outline"
                      : null
                  }
                  iconfontsize={30}
                  right={0.8}
                  items={TreeItemBuilderForHomeAndGroups(g?.details)}
                  optionColor={
                    activeGroupCatAsState.value === "Archived" ? "#D79244" : ""
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

      <BottomMainMenu onClick={() => (menu.value = "createGroup")} />
      <CreateGroupAnimation menu={menu} currencyMenu={currencyMenu} />
    </StyledGroupsContainer>
  );
}
