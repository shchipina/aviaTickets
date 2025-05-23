export const formatBadgeCount = (count: number): string => {
  if (count > 9) return "9+";
  return count > 0 ? count.toString() : "0";
};
