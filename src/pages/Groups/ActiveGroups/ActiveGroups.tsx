import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import TreeAdjustedContainer from "../../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Spinner from "../../../components/Spinner/Spinner";
import { TreeItemBuilder } from "../../../components/TreeItemBuilder";
import { getGroupsTotalAmounts } from "../../../api/services/api";
import useSentinel from "../../../hooks/useSentinel";

export default function ActiveGroups() {
  const sentinelRef = useRef(null);
  const navigate = useNavigate();
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groups", "active"],
      queryFn: ({ pageParam: next }) => getGroupsTotalAmounts(pageSize, next),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });
    
  const groups = data?.pages.flatMap((p) => p.groups);

  useSentinel(fetchNextPage, hasNextPage, isFetchingNextPage);

  const onGroupClickHandler = (id: string, groupName: string) => {
    navigate(`/groups/active/${id}/expenses`, { state: { groupName } });
    localStorage.setItem("mostRecentGroup", id);
  };

  return (
    <StyledActiveGroups>
      {isFetching && !isFetchingNextPage ? (
        <Spinner />
      ) : (
        <div className="groups">
          {groups?.length === 0 ? (
            <div className="noGroupMsg">
              There are currently no&nbsp;<strong>active</strong>&nbsp;groups
            </div>
          ) : (
            ""
          )}
          {groups?.map((g: any) => (
            <div key={g.id}>
              <TreeAdjustedContainer
                onClick={() => onGroupClickHandler(g.id, g.name)}
                hasarrow={true}
                items={TreeItemBuilder(g?.details)}
              >
                <div className="groupName">{g.name}</div>
              </TreeAdjustedContainer>
            </div>
          ))}
          <div
            ref={sentinelRef}
            className="sentinel"
            style={{ height: "1px" }}
          ></div>
          {isFetchingNextPage ? <Spinner /> : null}
        </div>
      )}
    </StyledActiveGroups>
  );
}
