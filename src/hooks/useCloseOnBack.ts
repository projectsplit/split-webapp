import { useEffect, useRef } from 'react';

type OverlayEntry = { close: () => void };

const openOverlays: OverlayEntry[] = [];
const session = `${Date.now()}-${Math.random()}`;
let traversing = false;
let syncQueued = false;
let isListening = false;

const ownDepth = (): number => {
  const state = window.history.state;
  return state?.overlaySession === session ? state.overlayDepth : 0;
};

const isForeignOverlay = () => {
  const state = window.history.state;
  return !!state?.overlaySession && state.overlaySession !== session;
};

const traverse = (delta: number) => {
  traversing = true;
  window.history.go(delta);
};

const pushEntry = () => {
  const current = window.history.state;
  const idx = current?.idx;
  window.history.pushState(
    {
      ...current,
      idx: typeof idx === 'number' ? idx + 1 : idx,
      overlaySession: session,
      overlayDepth: ownDepth() + 1,
    },
    ''
  );
};

const closeAbove = (depth: number) => {
  openOverlays
    .slice(depth)
    .reverse()
    .forEach((entry) => entry.close());
};

const sync = () => {
  syncQueued = false;
  if (traversing) return;

  const wanted = openOverlays.length;
  let current = ownDepth();

  if (wanted < current) {
    traverse(wanted - current);
    return;
  }

  while (current < wanted) {
    pushEntry();
    current++;
  }
};

const queueSync = () => {
  if (syncQueued) return;
  syncQueued = true;
  queueMicrotask(sync);
};

const handlePopState = () => {
  traversing = false;

  if (isForeignOverlay()) {
    closeAbove(0);
    traverse(-1);
    return;
  }

  const target = ownDepth();
  if (openOverlays.length > target) {
    closeAbove(target);
  } else if (openOverlays.length < target) {
    traverse(openOverlays.length - target);
    return;
  }

  queueSync();
};

export const useCloseOnBack = (isOpen: boolean, close: () => void) => {
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    if (!isOpen) return;

    const entry: OverlayEntry = { close: () => closeRef.current() };
    openOverlays.push(entry);
    queueSync();

    if (!isListening) {
      window.addEventListener('popstate', handlePopState);
      isListening = true;
    }

    return () => {
      const index = openOverlays.indexOf(entry);
      if (index !== -1) openOverlays.splice(index, 1);
      queueSync();
    };
  }, [isOpen]);
};
