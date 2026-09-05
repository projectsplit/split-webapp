/**
 * What the Android back button should close, in the order things were opened.
 *
 * Menus here are drawn from signals rather than routes, so there is no history entry behind an open
 * menu and nothing for the browser's own back to undo. Without this, back on an open menu navigates
 * the page underneath it and leaves the menu floating over a screen it has nothing to do with.
 *
 * A module-level stack rather than context, for two reasons: it is read from a Capacitor event
 * listener that lives outside the React tree entirely, and the order that matters is the order
 * things were opened in, which cuts across component subtrees that know nothing about each other.
 *
 * Last in, first out — the same order they visually stack, so back peels them off the way someone
 * expects and a submenu never closes its parent out from under it.
 */

type BackHandler = () => void;

const handlers: BackHandler[] = [];

/**
 * Registers something for back to close. Returns the function that unregisters it, so it can be
 * returned straight from an effect.
 */
export function pushBackHandler(handler: BackHandler): () => void {
  handlers.push(handler);

  return () => {
    // By identity and from the top, so unregistering the newer of two identical closures cannot
    // remove the older one's entry and strand it in the stack forever.
    const index = handlers.lastIndexOf(handler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }
  };
}

/**
 * Closes the topmost thing, if there is one.
 *
 * @returns whether anything was closed. False means back should do whatever it would have done
 * otherwise — go back in history, or leave the app.
 */
export function handleBack(): boolean {
  const handler = handlers.at(-1);

  if (!handler) {
    return false;
  }

  handler();

  return true;
}
