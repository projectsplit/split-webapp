import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TreeAdjustedContainer from "../../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Spinner from "../../../components/Spinner/Spinner";
import { TreeItemBuilder } from "../../../components/TreeItemBuilder";
import { getGroupsTotalAmounts } from "../../../api/services/api";


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


  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <StyledActiveGroups >
      {isFetching || !data ? <Spinner /> : 
      <div className="groups">
        {groups?.map((g: any) => (
          <div key={g.id}>
            <TreeAdjustedContainer
              onClick={() => navigate(`/groups/active/${g.id}/transactions`)}
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
      </div>}
    </StyledActiveGroups>
  );
}
