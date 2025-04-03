import React, { useEffect, useRef } from "react";
import Spinner from "../Spinner/Spinner";

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
    <div style={{ display: "flex", flexDirection:"column", justifyContent:"center", marginBottom:"20px" }}>
      <div ref={sentinelRef} style={{ height: "1px" }} data-sentinel-id={id} />
      {isFetchingNextPage && <Spinner/>}
    </div>
  );
};

export default Sentinel;