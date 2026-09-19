import { Signal } from '@preact/signals-react';
import { ExpenseResponseItem } from '@/types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useCenterToExpense = (
  scrollAreaRef: React.RefObject<HTMLDivElement>,
  isScrolled: Signal<boolean>,
  expenses: ExpenseResponseItem[] | undefined,
  jumpToken?: string,
  isFetchingPreviousPage: boolean = false
) => {
  const savedScrollHeight = useRef<number>(0);
  const jumpToProcessed = useRef<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const handleScroll = () => {
      isScrolled.value = el.scrollTop > 10;
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isScrolled, expenses, scrollAreaRef]);
  useLayoutEffect(() => {
    if (isFetchingPreviousPage && scrollAreaRef.current) {
      savedScrollHeight.current = scrollAreaRef.current.scrollHeight;
    }
  }, [isFetchingPreviousPage, scrollAreaRef]);

  useLayoutEffect(() => {
    if (
      !isFetchingPreviousPage &&
      savedScrollHeight.current > 0 &&
      scrollAreaRef.current
    ) {
      const newScrollHeight = scrollAreaRef.current.scrollHeight;
      scrollAreaRef.current.scrollTop +=
        newScrollHeight - savedScrollHeight.current;
      savedScrollHeight.current = 0;
    }
  }, [isFetchingPreviousPage, expenses?.length, scrollAreaRef]);

  useLayoutEffect(() => {
    if (
      jumpToken &&
      jumpToken !== jumpToProcessed.current &&
      expenses &&
      expenses.length > 0
    ) {
      try {
        const tokenStr = atob(jumpToken);
        const parsedToken = JSON.parse(tokenStr);
        const targetOccurred = parsedToken.Occurred;
        const targetCreated = parsedToken.Created;
        const targetExpense = expenses.find(
          (e) => e.occurred === targetOccurred && e.created === targetCreated
        );
        if (targetExpense) {
          const element = document.getElementById(
            `expense-${targetExpense.id}`
          );
          if (element) {
            element.scrollIntoView({ block: 'center' });

            setHighlightedId(targetExpense.id);

            jumpToProcessed.current = jumpToken;
          }
        }
      } catch (e) {
        console.error('Failed to parse jump token', e);
      }
    }
  }, [jumpToken, expenses]);

  return highlightedId;
};
