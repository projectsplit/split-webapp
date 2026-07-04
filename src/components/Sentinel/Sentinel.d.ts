import React from 'react';
interface SentinelProps {
    fetchPage: () => void;
    hasMore: boolean;
    isFetchingPage: boolean;
    id?: string;
    isTop?: boolean;
}
declare const Sentinel: React.FC<SentinelProps>;
export default Sentinel;
