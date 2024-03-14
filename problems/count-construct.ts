/*
Given a string 'target' and a string array 'wordBank', return a number
of possible combinations from strings from 'wordBank' that form 'target' together.
*/

import { measure } from "../utils/measure";

const countConstructBasic = (target: string, wordBank: string[]): number => {
  if (target === "") return 1;

  let count = 0;
  for (const word of wordBank.filter((w) => target.startsWith(w))) {
    count += countConstructBasic(target.slice(word.length), wordBank);
  }

  return count;
};

measure(() =>
  countConstructBasic("abcdef", ["ab", "abc", "cd", "def", "abcd"])
);
measure(() =>
  countConstructBasic("skateboard", [
    "bo",
    "rd",
    "ate",
    "t",
    "ska",
    "sk",
    "boar",
  ])
);
measure(() =>
  countConstructBasic("aaaaaaaaaaaaaaaaaaaaaa", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);
measure(() =>
  countConstructBasic("aaaaaaaaaaaaaaaaaaaaaaf", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);

const countConstruct = (
  target: string,
  wordBank: string[],
  memo: Record<string, number> = {}
): number => {
  if (target === "") return 1;
  if (target in memo) return memo[target];

  let count = 0;
  for (const word of wordBank.filter((w) => target.startsWith(w))) {
    count += countConstruct(target.slice(word.length), wordBank, memo);
  }
  memo[target] = count;
  return count;
};

console.log("DP ↓");
measure(() => countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() =>
  countConstruct("aaaaaaaaaaaaaaaaaaaaaa", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);
measure(() =>
  countConstruct(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf",
    ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa"]
  )
);
measure(() =>
  countConstruct(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa"]
  )
);
