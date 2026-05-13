export const dateIsInPast = (date: string | undefined) => {
  if (!date) return false;
  const now = new Date().toISOString();
  return date < now;
};
