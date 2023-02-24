import categoriesId from "../data/categoriesId.json";

export function formatCategories(categories: string[]): string {
  const ids: string[] = [];

  categories.forEach((category) => {
    ids.push(categoriesId[category as keyof typeof categoriesId].join(","));
  });

  return ids.join(",");
}
