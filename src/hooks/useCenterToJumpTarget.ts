import { Signal } from '@preact/signals-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useJumpRequest } from './useJumpRequest';

type JumpTarget = { id: string; occurred: string; created: string };

/** The item a jump marked, and which jump it was, so each one draws its ring afresh. */
export type JumpHighlight = { id: string; run: number };

/**
 * Brings the item a jump link (?jumpTo=) names into the middle of the list and marks it, and keeps
 * the view steady while newer items load in above it. Used by the expense and transfer lists alike:
 * each renders its rows with the id `${idPrefix}-${item.id}` so the target can be found.
 *
 * Following the same link again is another jump (see useJumpRequest), so the same notification
 * tapped again from inside the list brings the item back to the middle and rings it again.
 */
export const useCenterToJumpTarget = <T extends JumpTarget>(
  scrollAreaRef: React.RefObject<HTMLDivElement | null>,
  isScrolled: Signal<boolean>,
  items: T[] | undefined,
  idPrefix: string,
  jumpToken?: string,
  isFetchingPreviousPage: boolean = false,
  isPlaceholderData: boolean = false
) => {
  const jump = useJumpRequest(jumpToken);
  const savedScrollHeight = useRef<number>(0);
  const jumpProcessed = useRef<string | null>(null);
  const [highlight, setHighlight] = useState<JumpHighlight | null>(null);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const handleScroll = () => {
      isScrolled.value = el.scrollTop > 10;
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isScrolled, items, scrollAreaRef]);
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
  }, [isFetchingPreviousPage, items?.length, scrollAreaRef]);

  useLayoutEffect(() => {
    if (
      jump &&
      jumpToken &&
      jump !== jumpProcessed.current &&
      // A jump made while the list is already open shows the old list until the page around the
      // target arrives. Centring on the target there would spend the jump on rows about to be
      // replaced, and leave it off-centre once they are.
      !isPlaceholderData &&
      items &&
      items.length > 0
    ) {
      try {
        const tokenStr = atob(jumpToken);
        const parsedToken = JSON.parse(tokenStr);
        const targetOccurred = parsedToken.Occurred;
        const targetCreated = parsedToken.Created;
        const target = items.find(
          (e) => e.occurred === targetOccurred && e.created === targetCreated
        );
        if (target) {
          const element = document.getElementById(`${idPrefix}-${target.id}`);
          if (element) {
            element.scrollIntoView({ block: 'center' });

            setHighlight((current) => ({
              id: target.id,
              run: (current?.run ?? 0) + 1,
            }));

            jumpProcessed.current = jump;
          }
        }
      } catch (e) {
        console.error('Failed to parse jump token', e);
      }
    }
  }, [jump, jumpToken, items, idPrefix, isPlaceholderData]);

  return highlight;
};
