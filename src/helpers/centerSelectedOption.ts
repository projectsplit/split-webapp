export const centerSelectedOption = (
  container: HTMLElement | null,
  selected: HTMLElement | null
) => {
  if (!container || !selected) return;

  const containerRect = container.getBoundingClientRect();
  const selectedRect = selected.getBoundingClientRect();

  container.scrollTop +=
    selectedRect.top -
    containerRect.top -
    (containerRect.height - selectedRect.height) / 2;
};
