import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import TreeAdjustedContainer from "../../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Spinner from "../../../components/Spinner/Spinner";
import { getGroupsTotalAmounts } from "../../../api/services/api";
import { useMostRecentGroup } from "../../../api/services/useMostRecentGroup";
import { TreeItemBuilderForHomeAndGroups } from "../../../components/TreeItemBuilderForHomeAndGroups";
import Sentinel from "../../../components/Sentinel";
import { MdOutlineGroupOff } from "react-icons/md";
import GroupOptions from "../GroupOptions/GroupOptions";
import { Signal, useSignal } from "@preact/signals-react";
import { GroupWithDetails } from "../../../types";

export default function ActiveGroups() {
  const navigate = useNavigate();
  const pageSize = 10;

  // const { openGroupOptionsMenu } = useOutletContext<{
  //   openGroupOptionsMenu: Signal<boolean>;
  // }>();

  // const selectedGroup = useSignal<GroupWithDetails|null>(null)
 
  // const { data: selectedGroup } = useGroup(groupid.value);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groups", "active"],
      queryFn: ({ pageParam: next }) => getGroupsTotalAmounts(pageSize, next),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });

  const groups = data?.pages.flatMap((p) => p.groups);
  const updateMostRecentGroupId = useMostRecentGroup();

  const onGroupClickHandler = (id: string, groupName: string) => {
    navigate(`/groups/active/${id}/expenses`, { state: { groupName } });
    updateMostRecentGroupId.mutate(id);
  };

  return (
    <StyledActiveGroups>
      {isFetching && !isFetchingNextPage ? (
        <Spinner />
      ) : (
        <div className="groups">
          {groups?.length === 0 ? (
            <div className="noData">
              <div className="msg">There are currently no active groups</div>
              <MdOutlineGroupOff className="icon" />
            </div>
          ) : (
            ""
          )}
          {groups?.map((g: any) => (
            <div key={g.id} >
              <TreeAdjustedContainer
                onClick={() => onGroupClickHandler(g.id, g.name)}
                hasOption={false}
                // optionname={"settings-outline"}
                iconfontsize={20}
                right={0.8}
                items={TreeItemBuilderForHomeAndGroups(g?.details)}
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
    </StyledActiveGroups>
  );
}
