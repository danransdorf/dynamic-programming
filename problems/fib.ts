// Return the value of 'n'th element of Fibonacci's sequence

import { measure } from "../utils/measure";

const fibBasic = (n: number): number =>
  n <= 2 ? 1 : fibBasic(n - 1) + fibBasic(n - 2);

measure(() => fibBasic(20));
measure(() => fibBasic(30));
measure(() => fibBasic(40));

// Memoization
const fib = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
};

measure(() => fib(20));
measure(() => fib(30));
measure(() => fib(40));
