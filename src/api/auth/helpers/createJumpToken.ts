export const createJumpToken = (occurred: string, created: string): string => {
  const tokenObj = {
    Occurred: occurred,
    Created: created,
    IsJumpTo: true,
  };
  return btoa(JSON.stringify(tokenObj));
};
