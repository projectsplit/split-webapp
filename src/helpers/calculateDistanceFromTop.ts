export const calculateDistanceFromTop = (elRef: React.RefObject<HTMLDivElement>) => {

  if (elRef.current) {
    return window.scrollY + elRef.current.getBoundingClientRect().top;
  } else {
    return 0
  }
};