import { useEffect, useRef } from 'react';
const useSentinel = (fetchNextPage, hasNextPage, isFetchingNextPage) => {
    const sentinelRef = useRef(null);
    useEffect(() => {
        if (!sentinelRef.current || !hasNextPage || isFetchingNextPage)
            return;
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
