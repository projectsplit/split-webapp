import { StyledActiveGroups } from "./ActiveGroups.styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { calculateDistanceFromTop } from "../../../helpers/calculateDistanceFromTop";
import TreeAdjustedContainer from "../../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import Spinner from "../../../components/Spinner/Spinner";
import { TreeItemBuilder } from "../../../components/TreeItemBuilder";
import { getGroupsTotalAmounts } from "../../../api/services/api";


export default function ActiveGroups() {
  const elRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef(null);
  const navigate = useNavigate();

  // const heightFromTop = window.innerHeight - calculateDistanceFromTop(elRef); //(58 + 36 + 18 + 4 + 30)
  // const fittingItems = Math.round(heightFromTop / 81);
  // const navigate = useNavigate();

  // const {
  //   // isLoading,
  //   // isError,
  //   // error,
  //   data,
  //   hasNextPage,
  //   fetchNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  // } = useInfiniteQuery(
  //   ["groups", "active"],
  //   ({ pageParam }) => api.getUserGroups(fittingItems, { pageParam }),
  //   {
  //     getNextPageParam: (lastPage, _pages) => {
  //       if (lastPage.length > 0) {
  //         const lastGroupAndPendingTransactions = lastPage[lastPage.length - 1];
  //         const { creationTime } = lastGroupAndPendingTransactions.group;
  //         return creationTime;
  //       } else return undefined;
  //     },
  //   }
  // );

  // useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event: any) => {
  //     const target = event.target as HTMLDivElement;
  //     const { scrollHeight, scrollTop, clientHeight } = target;

  //     if (!fetching && scrollHeight - scrollTop <= clientHeight) {
  //       fetching = true;

  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };
  //   const scrollableElement = elRef.current;
  //   if (scrollableElement) {
  //     scrollableElement.addEventListener("scroll", onScroll);
  //   }
  //   return () => {
  //     if (scrollableElement) {
  //       scrollableElement.removeEventListener("scroll", onScroll);
  //     }
  //   };
  // }, [fetchNextPage, hasNextPage]);

  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["groups", "active", pageSize],
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
    <StyledActiveGroups ref={elRef}>
      {isFetching && data === undefined ? <Spinner /> : null}
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
      </div>
    </StyledActiveGroups>
  );
}
