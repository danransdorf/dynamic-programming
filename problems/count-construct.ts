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

const countConstructMemo = (
  target: string,
  wordBank: string[],
  memo: Record<string, number> = {}
): number => {
  if (target === "") return 1;
  if (target in memo) return memo[target];

  let count = 0;
  for (const word of wordBank) {
    if (target.startsWith(word)) {
      count += countConstructMemo(target.slice(word.length), wordBank, memo);
    }
  }
  memo[target] = count;
  return count;
};

console.log("DP - memo ↓");
measure(() => countConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  countConstructMemo("skateboard", [
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
  countConstructMemo("aaaaaaaaaaaaaaaaaaaaaa", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);
measure(() =>
  countConstructMemo(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf",
    ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa"]
  )
);
measure(() =>
  countConstructMemo(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    Array(300)
      .fill("a")
      .map((str, index) => str.repeat(index + 1))
  )
);

// Tabulation
const countConstructTable = (target: string, wordBank: string[]): number => {
  const table: number[] = Array(target.length + 1).fill(0);
  table[0] = 1;

  for (let i = 0; i < target.length; i++) {
    if (table[i]) {
      for (const word of wordBank) {
        if (target.slice(i).startsWith(word)) {
          table[i + word.length] += table[i];
        }
      }
    }
  }

  return table[target.length];
};

console.log("DP - table ↓");
measure(() => countConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  countConstructTable("skateboard", [
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
  countConstructTable("aaaaaaaaaaaaaaaaaaaaaa", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);
measure(() =>
  countConstructTable(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf",
    ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa"]
  )
);
measure(() =>
  countConstructTable(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    Array(300)
      .fill("a")
      .map((str, index) => str.repeat(index + 1))
  )
);
