import { MutableRefObject } from 'react';
declare const useSentinel: (fetchNextPage: () => void, hasNextPage: boolean, isFetchingNextPage: boolean) => MutableRefObject<HTMLDivElement | null>;
export default useSentinel;
