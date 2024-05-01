import { MerchItem } from "../types";

const levenshteinDistance = (a: string, b: string): number => {
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
};

const containsLetters = (word: string, letters: string[]): boolean => {
  return letters.some((letter) => word.includes(letter));
};

const calculateScore = (query: string, itemName: string): number => {
  const queryWords = query.toLowerCase().split(" ");
  const itemNameWords = itemName.toLowerCase().split(" ");

  let totalScore = 0;

  for (const queryWord of queryWords) {
    let maxSimilarity = 0;

    for (const itemNameWord of itemNameWords) {
      const distance = levenshteinDistance(queryWord, itemNameWord);
      const similarity = 1 / (1 + distance);

      maxSimilarity = Math.max(maxSimilarity, similarity);
      totalScore += maxSimilarity;
    }
  }
  return totalScore;
};

export const searchItems = (
  searchQuery: string,
  items: MerchItem[]
): MerchItem[] => {
  const scoredItems: { item: MerchItem; score: number }[] = [];
  console.clear();

  for (const item of items) {
    const score = calculateScore(searchQuery, item.name);
    // console.log(`${item.name} ${score}`);

    // console.log(
    //   containsLetters(
    //     item.name.toLowerCase(),
    //     searchQuery.toLowerCase().replace(" ", "").split("")
    //   )
    // );

    // Add a condition to filter out items with no matching letters or significantly lower score
    if (score > 0.125) {
      scoredItems.push({ item, score });
    }
  }

  // Sort items based on score in descending order
  scoredItems.sort((a, b) => b.score - a.score);

  // Check if the lowest scored item is more than 0.1 lower than the next lowest
  if (
    scoredItems.length > 1 &&
    scoredItems[0].score - scoredItems[1].score > 0.1
  ) {
    // Remove the lowest scored item
    scoredItems.pop();
  }

  // Check if the difference between the highest and current item is more than 0.2
  const maxDifference = 0.1;
  if (
    scoredItems.length > 1 &&
    scoredItems[0].score - scoredItems[scoredItems.length - 1].score >
      maxDifference
  ) {
    // Remove items that are more than 0.2 lower than the highest scored item
    while (
      scoredItems.length > 1 &&
      scoredItems[0].score - scoredItems[scoredItems.length - 1].score >
        maxDifference
    ) {
      scoredItems.pop();
    }
  }

  // Extract items from the sorted list
  const result = scoredItems.map((scoredItem) => scoredItem.item);

  return result;
};
