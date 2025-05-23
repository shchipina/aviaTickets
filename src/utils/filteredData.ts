import type { Flight } from "../types/flight";

export const filteredData = (data: Flight[], query: string, sortBy: string) => {
  let filtered = [...data];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();
    filtered = filtered.filter((item) =>
      item.airline.toLowerCase().includes(normalizedQuery)
    );
  }

  switch (sortBy) {
    case "ASC":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "DESC":
      filtered.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return filtered;
};
