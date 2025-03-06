import React, { useEffect, useRef } from "react";

interface SentinelProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  id?: string;
  loadingText?: string;
}

const Sentinel: React.FC<SentinelProps> = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  id = "sentinel",
  loadingText = "Loading more...",
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, id]);

  return (
    <>
      <div ref={sentinelRef} style={{ height: "1px" }} data-sentinel-id={id} />
      {isFetchingNextPage && <div>{loadingText}</div>}
    </>
  );
};

export default Sentinel;