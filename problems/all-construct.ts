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

const allConstruct = (
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
  return allCombinations;
};

measure(() => allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() => allConstruct("aaa", ["a", "aa", "aaa"]));
/* measure(() => allConstruct("aaaaaaaaaaaaaaaaa", ["a", "aa", "aaa"])); */
