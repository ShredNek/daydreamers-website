import { MerchItem } from "../types";

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

const calculateScore = (query: string, itemName: string): number => {
  const queryWords = query.toLowerCase().split(" ");
  const itemNameWords = itemName.toLowerCase().split(" ");

  let totalScore = 0;

  for (const queryWord of queryWords) {
    let maxSimilarity = 0;

    for (const itemNameWord of itemNameWords) {
      const similarity = 1 / (1 + levenshteinDistance(queryWord, itemNameWord));
      maxSimilarity = Math.max(maxSimilarity, similarity);
    }

    totalScore += maxSimilarity * queryWord.length;
  }

  return totalScore;
};

export const searchItems = (
  searchQuery: string,
  items: MerchItem[]
): MerchItem[] => {
  const scoredItems: { item: MerchItem; score: number }[] = [];

  for (const item of items) {
    const score = calculateScore(searchQuery, item.name);
    scoredItems.push({ item, score });
  }

  // Sort items based on score in descending order
  const sortedItems = scoredItems.sort((a, b) => b.score - a.score);

  // Extract items from the sorted list
  const result = sortedItems.map((scoredItem) => scoredItem.item);

  return result;
};
