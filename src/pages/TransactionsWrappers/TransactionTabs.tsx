import {
  RefObject,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Expenses, Members, Transfers } from '@/lazyRoutes';
import Spinner from '@/components/Spinner/Spinner';
import { TabPageProvider } from './transactionsPageContext';
import { StyledTransactionTabs } from './TransactionTabs.styled';

// In the order of the tabs above them, each by its path under the screen.
const TABS = [
  { path: 'expenses', Page: Expenses },
  { path: 'transfers', Page: Transfers },
  { path: 'debts', Page: Members },
];

type Props = {
  trackRef: RefObject<HTMLDivElement | null>;
  /** The last part of the address, which names the tab in view. */
  activePath: string;
  /** What the pages are given, as an outlet would give it. */
  context: unknown;
};

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Where scrollend is missing, a swipe counts as over once the track has been still this long.
const SETTLE_MS = 150;

/**
 * Expenses, transfers and debts side by side, moving with the finger as it swipes between them,
 * the way the welcome tour's slides do. The address follows once a swipe comes to rest, and a tab
 * tapped above, or a link to one, scrolls the track there in turn.
 */
export default function TransactionTabs({
  trackRef,
  activePath,
  context,
}: Props) {
  const navigate = useNavigate();
  const activeIndex = Math.max(
    0,
    TABS.findIndex((tab) => tab.path === activePath)
  );

  // The page in view first, and the others once it has had its turn, so a swipe finds them ready.
  const [allMounted, setAllMounted] = useState(false);

  useEffect(() => {
    const mountAll = () => setAllMounted(true);

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(mountAll, { timeout: 1000 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(mountAll, 300);
    return () => window.clearTimeout(id);
  }, []);

  // The tab a swipe came to rest on, which the address then moves to with the track already there.
  const restedOn = useRef<number | null>(null);
  const latest = useRef({ activeIndex, navigate });
  latest.current = { activeIndex, navigate };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const settle = () => {
      if (track.clientWidth === 0) return;

      const index = Math.round(track.scrollLeft / track.clientWidth);
      const { activeIndex, navigate } = latest.current;
      if (index === activeIndex || !TABS[index]) return;

      restedOn.current = index;
      navigate(TABS[index].path, { replace: true });
    };

    if ('onscrollend' in window) {
      track.addEventListener('scrollend', settle);
      return () => track.removeEventListener('scrollend', settle);
    }

    let timer = 0;
    const handleScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, SETTLE_MS);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      track.removeEventListener('scroll', handleScroll);
    };
  }, [trackRef]);

  const isFirst = useRef(true);

  // Before paint, so the screen opens on its tab rather than sliding there from the first.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const first = isFirst.current;
    isFirst.current = false;

    const rested = restedOn.current === activeIndex;
    restedOn.current = null;
    if (rested) return;

    const left = activeIndex * track.clientWidth;
    if (Math.abs(track.scrollLeft - left) < 1) return;

    track.scrollTo({
      left,
      behavior: first || prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [activeIndex, trackRef]);

  return (
    <StyledTransactionTabs
      ref={trackRef}
      onTouchStart={allMounted ? undefined : () => setAllMounted(true)}
    >
      {TABS.map(({ path, Page }, position) => {
        const inView = position === activeIndex;

        return (
          <section key={path} className="tabPage" aria-hidden={!inView}>
            {allMounted || inView ? (
              <TabPageProvider value={{ context, inView }}>
                <Suspense
                  fallback={
                    <div className="spinner">
                      <Spinner />
                    </div>
                  }
                >
                  <Page />
                </Suspense>
              </TabPageProvider>
            ) : null}
          </section>
        );
      })}
    </StyledTransactionTabs>
  );
}
