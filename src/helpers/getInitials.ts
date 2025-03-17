export const getInitials = (name: string | undefined) => {
  if (!name) return " ";
  const words = name.trim().split(" ");
  if (words && words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else if (words && words.length > 1) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }
  return "";
};
