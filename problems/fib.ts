// Return the value of 'n'th element of Fibonacci's sequence

import { measure } from "../utils/measure";

const fibBasic = (n: number): number =>
  n <= 2 ? 1 : fibBasic(n - 1) + fibBasic(n - 2);

measure(() => fibBasic(20));
measure(() => fibBasic(30));
measure(() => fibBasic(40));

// Memoization
const fibMemo = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
};

console.log("DP - memo ↓");
measure(() => fibMemo(20));
measure(() => fibMemo(30));
measure(() => fibMemo(40));
measure(() => fibMemo(1200));
measure(() => fibMemo(25000));

// Tabulation
const fibTable = (n: number): number => {
  const table = Array(n).fill(1);

  for (let i = 2; i < n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }

  return table[n - 1];
};

console.log("DP - table ↓");
measure(() => fibTable(20));
measure(() => fibTable(30));
measure(() => fibTable(40));
measure(() => fibTable(1200));
measure(() => fibTable(25000));

// Pointers
const fibPointers = (n: number): number => {
  let l = 1,
    r = 1;

  for (let i = 2; i < n; i++) {
    [l, r] = [r, l + r];
  }

  return r;
};

console.log("DP - pointers ↓");
measure(() => fibPointers(20));
measure(() => fibPointers(30));
measure(() => fibPointers(40));
measure(() => fibPointers(1200));
measure(() => fibPointers(25000));
