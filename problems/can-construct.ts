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

const canConstruct = (
  target: string,
  wordBank: string[],
  memo: Record<string, false> = {}
): boolean => {
  if (target === "") return true;
  if (target in memo) return false;

  for (const word of wordBank.filter((w) => target.startsWith(w))) {
    const newTarget = target.slice(word.length);
    if (canConstruct(newTarget, wordBank, memo)) return true;
    memo[newTarget] = false;
  }

  return false;
};

measure(() => canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
measure(() =>
  canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
measure(() =>
  canConstruct("aaaaaaaaaaaaaaaaaaaaaaf", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
  ])
);

measure(() =>
  canConstruct(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaf",
    [
      "a",
      "aa",
      "aaa",
      "aaaa",
      "aaaaa",
      "aaaaaa",
      "aaaaaaa",
      "aaaaaaaa",
      "aaaaaaaaa",
      "aaaaaaaaaa",
      "aaaaaaaaaaa",
      "aaaaaaaaaaaa",
      "aaaaaaaaaaaaa",
      "aaaaaaaaaaaaaa",
      "aaaaaaaaaaaaaaa",
      "aaaaaaaaaaaaaaaa",
    ]
  )
);
