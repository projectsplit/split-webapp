import { MutableRefObject, useEffect, useRef } from "react";

const useSentinel = (fetchNextPage:()=>void, hasNextPage:boolean, isFetchingNextPage:boolean):MutableRefObject<HTMLDivElement | null> => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

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

  return sentinelRef;
};

export default useSentinel;
