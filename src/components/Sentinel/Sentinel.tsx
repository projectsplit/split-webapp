import React, { useEffect, useRef } from "react";
import Spinner from "../Spinner/Spinner";

interface SentinelProps {
  fetchPage: () => void;
  hasMore: boolean;
  isFetchingPage: boolean;
  id?: string;
  isTop?: boolean;
}

const Sentinel: React.FC<SentinelProps> = ({
  fetchPage,
  hasMore,
  isFetchingPage,
  id = "sentinel",
  isTop = false,
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isFetchingPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchPage();
      }
    });

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [fetchPage, hasMore, isFetchingPage, id]);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: isTop ? "0px" : "20px" }}>
      <div ref={sentinelRef} style={{ height: "1px" }} data-sentinel-id={id} />
      {isFetchingPage && <Spinner />}
    </div>
  );
};

export default Sentinel;