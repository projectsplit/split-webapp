import { MenuAnimationBackgroundProps } from '../../interfaces';

/**
 * The dim layer behind every menu. Deliberately not a CSSTransition: it has no animation — the old
 * wrapper ran with timeout 0 and no classNames — so all the transition machinery contributed was
 * unmounting through a class-component timer. That timer loses the race when closing a menu and
 * navigating happen in the same click (the router wraps the navigation in startTransition and the
 * target route can suspend on its lazy chunk), leaving the transition stuck mid-exit: a full-screen
 * black layer over the new page that swallows every tap, with nothing left that could re-render it
 * away. Rendering straight from the signal cannot strand it — any render after the menu closes
 * returns null, and the navigation itself guarantees such a render.
 */
export default function MenuAnimationBackground({
  menu,
}: MenuAnimationBackgroundProps) {
  if (!menu.value) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: '0.88',
      }}
      onClick={() => (menu.value = null)}
    />
  );
}
