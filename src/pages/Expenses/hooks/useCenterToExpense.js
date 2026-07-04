import { useEffect, useLayoutEffect, useRef } from 'react';
export const useCenterToExpense = (scrollAreaRef, isScrolled, expenses, jumpToken, isFetchingPreviousPage = false) => {
    const savedScrollHeight = useRef(0);
    const jumpToProcessed = useRef(null);
    useEffect(() => {
        const el = scrollAreaRef.current;
        if (!el)
            return;
        const handleScroll = () => {
            isScrolled.value = el.scrollTop > 10;
        };
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [isScrolled, expenses]);
    // Before fetching the previous page, save the current scrollHeight so we can
    // restore the visual position after new items are prepended to the list.
    useLayoutEffect(() => {
        if (isFetchingPreviousPage && scrollAreaRef.current) {
            savedScrollHeight.current = scrollAreaRef.current.scrollHeight;
        }
    }, [isFetchingPreviousPage]);
    // After the previous page has been fetched and the DOM has updated, adjust
    // scrollTop so the user's viewport position appears unchanged.
    useLayoutEffect(() => {
        if (!isFetchingPreviousPage &&
            savedScrollHeight.current > 0 &&
            scrollAreaRef.current) {
            const newScrollHeight = scrollAreaRef.current.scrollHeight;
            scrollAreaRef.current.scrollTop +=
                newScrollHeight - savedScrollHeight.current;
            savedScrollHeight.current = 0;
        }
    }, [isFetchingPreviousPage, expenses?.length]);
    useLayoutEffect(() => {
        if (jumpToken &&
            jumpToken !== jumpToProcessed.current &&
            expenses &&
            expenses.length > 0) {
            try {
                const tokenStr = atob(jumpToken);
                const parsedToken = JSON.parse(tokenStr);
                const targetOccurred = parsedToken.Occurred;
                const targetCreated = parsedToken.Created;
                const targetExpense = expenses.find((e) => e.occurred === targetOccurred && e.created === targetCreated);
                if (targetExpense) {
                    const element = document.getElementById(`expense-${targetExpense.id}`);
                    if (element) {
                        element.scrollIntoView({ block: 'center' });
                        element.classList.add('expense-highlight');
                        // setTimeout(() => {
                        //   element.classList.remove("expense-highlight");
                        // }, 100000000);
                        jumpToProcessed.current = jumpToken;
                    }
                }
            }
            catch (e) {
                console.error('Failed to parse jump token', e);
            }
        }
    }, [jumpToken, expenses]);
};
