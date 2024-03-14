/*
Given a string 'target' and a string array 'wordBank', return all possible combinations from strings from 'wordBank' that form 'target' together.
*/

import { measure } from "../utils/measure";

const allConstructBasic = (target: string, wordBank: string[]): string[][] => {
  if (target === "") return [[]];

  const allCombinations = [];
  for (const word of wordBank.filter((w) => target.startsWith(w))) {
    allCombinations.push(
      ...allConstructBasic(target.slice(word.length), wordBank).map((combo) => [
        word,
        ...combo,
      ])
    );
  }

  return allCombinations;
};

measure(() => allConstructBasic("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  allConstructBasic("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() => allConstructBasic("aaa", ["a", "aa", "aaa"]));

const allConstructMemo = (
  target: string,
  wordBank: string[],
  memo: Record<string, string[][]> = {}
) => {
  if (target === "") return [[]];
  if (target in memo) return memo[target];

  const allCombinations = [];
  for (const word of wordBank) {
    if (target.startsWith(word)) {
      allCombinations.push(
        ...allConstructBasic(target.slice(word.length), wordBank).map(
          (combo) => [word, ...combo]
        )
      );
    }
  }

  memo[target] = allCombinations;
  return Array.from(
    new Set(allCombinations.map((arr) => JSON.stringify(arr.sort())))
  ).map((json) => JSON.parse(json));
};

console.log("DP - memo ↓");
measure(() => allConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  allConstructMemo("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() => allConstructMemo("aaa", ["a", "aa", "aaa"]));
/* measure(
  () =>
    allConstructMemo(
      "aaaaaaaaaaaaaaaaaaa",
      Array(3)
        .fill("a")
        .map((str, index) => str.repeat(index + 1))
    ).length
); */

// Tabulation
const allConstructTable = (target: string, wordBank: string[]): string[][] => {
  const table: Set<string>[] = Array(target.length + 1)
    .fill(undefined)
    .map(() => new Set() as Set<string>);
  table[0].add("");

  for (let i = 0; i < target.length; i++) {
    if (table[i]) {
      for (let j = 0; j < wordBank.length; j++) {
        const word = wordBank[j];
        if (target.slice(i).startsWith(word)) {
          table[i + word.length].add(word);
        }
      }
    }
  }

  const generateCombinations = (): string[][] => {
    const dp: string[][][] = Array(target.length + 1)
      .fill(null)
      .map(() => []);
    dp[0] = [[]];

    for (let i = 1; i <= target.length; i++) {
      for (const word of table[i]) {
        dp[i - word.length].forEach((combo) => dp[i].push([word, ...combo]));
      }
    }

    return dp[target.length];
  };

  const res = generateCombinations();

  return Array.from(new Set(res.map((arr) => JSON.stringify(arr.sort())))).map(
    (json) => JSON.parse(json)
  );
};

console.log("DP - table ↓");
measure(() => allConstructTable("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  allConstructTable("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() => allConstructTable("aaa", ["a", "aa", "aaa"]));
measure(
  () =>
    allConstructTable(
      "aaaaaaaaaaaaaaaaaaa",
      Array(3)
        .fill("a")
        .map((str, index) => str.repeat(index + 1))
    ).length
);
