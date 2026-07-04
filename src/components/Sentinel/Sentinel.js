import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import Spinner from '../Spinner/Spinner';
const Sentinel = ({ fetchPage, hasMore, isFetchingPage, id = 'sentinel', isTop = false, }) => {
    const sentinelRef = useRef(null);
    useEffect(() => {
        if (!hasMore || isFetchingPage)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                fetchPage();
            }
        });
        const sentinel = sentinelRef.current;
        if (sentinel)
            observer.observe(sentinel);
        return () => {
            if (sentinel)
                observer.unobserve(sentinel);
        };
    }, [fetchPage, hasMore, isFetchingPage, id]);
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: isTop ? '0px' : '20px',
        }, children: [_jsx("div", { ref: sentinelRef, style: { height: '1px' }, "data-sentinel-id": id }), isFetchingPage && _jsx(Spinner, {})] }));
};
export default Sentinel;
