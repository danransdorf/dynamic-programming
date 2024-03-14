/*
Given a string 'target' and a string array 'wordBank', return a boolean
indicating whether 'target' is constructable from strings from 'wordBank'.
*/

import { measure } from "../utils/measure";

const canConstructBasic = (target: string, wordBank: string[]): boolean => {
  if (target === "") return true;

  for (const word of wordBank.filter((w) => target.startsWith(w))) {
    if (canConstructBasic(target.slice(word.length), wordBank)) return true;
  }

  return false;
};

measure(() => canConstructBasic("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  canConstructBasic("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() =>
  canConstructBasic("aaaaaaaaaaaaaaaaaaaaaaf", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);

// Memoization
const canConstructMemo = (
  target: string,
  wordBank: string[],
  memo: Record<string, false> = {}
): boolean => {
  if (target === "") return true;
  if (target in memo) return false;

  for (const word of wordBank) {
    if (target.startsWith(word)) {
      const newTarget = target.slice(word.length);
      if (canConstructMemo(newTarget, wordBank, memo)) return true;
      memo[newTarget] = false;
    }
  }

  return false;
};

console.log("DP - memo ↓");
measure(() => canConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  canConstructMemo("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() =>
  canConstructMemo("aaaaaaaaaaaaaaaaaaaaaaf", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);

measure(() =>
  canConstructMemo(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf",
    Array(400)
      .fill("a")
      .map((str, index) => str.repeat(index + 1))
  )
);

// Tabulation
const canConstructTable = (target: string, wordBank: string[]): boolean => {
  const table: boolean[] = Array(target.length + 1).fill(false);
  table[0] = true;

  for (let i = 0; i < target.length; i++) {
    if (table[i]) {

      for (const word of wordBank) {
        if (target.slice(i).startsWith(word)) {
          table[i + word.length] = true;
        }
      }
    }
  }

  return table[target.length];
};

console.log("DP - table ↓");
measure(() => canConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  canConstructMemo("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() =>
  canConstructMemo("aaaaaaaaaaaaaaaaaaaaaaf", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);

measure(() =>
  canConstructMemo(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf",
    Array(400)
      .fill("a")
      .map((str, index) => str.repeat(index + 1))
  )
);
