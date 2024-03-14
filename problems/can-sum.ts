/*
Given number 'targetSum' and an array of numbers 'numbers', return a boolean
indicating whether or not it is possible to generate the 'targetSum' using
numbers from 'numbers'. Use the elements from 'numbers' as many times as you need.
*/

import { measure } from "../utils/measure";

const canSumBasic = (targetSum: number, numbers: number[]): boolean => {
  if (targetSum == 0) return true;
  if (targetSum < 0) return false;

  for (const num of numbers) {
    if (canSumBasic(targetSum - num, numbers)) return true;
  }

  return false;
};

measure(() => canSumBasic(20, [1, 3, 5, 7, 9]));
measure(() => canSumBasic(7, [5, 3, 4, 7]));
measure(() => canSumBasic(250, [7, 14]));

const canSumMemo = (
  targetSum: number,
  numbers: number[],
  memo: Record<number, boolean> = {}
): boolean => {
  if (targetSum == 0) return true;
  if (targetSum < 0) return false;
  if (targetSum in memo) return memo[targetSum];

  for (const num of numbers) {
    if (canSumMemo(targetSum - num, numbers, memo)) return true;
    memo[targetSum - num] = false;
  }

  return false;
};

console.log("DP - memo ↓");
measure(() => canSumMemo(20, [1, 3, 5, 7, 9]));
measure(() => canSumMemo(7, [5, 3, 4, 7]));
measure(() => canSumMemo(250, [7, 14]));
measure(() => canSumMemo(15001, [2, 4, 6, 8, 10, 12, 14, 16]));
measure(() => canSumMemo(25001, [2, 4, 6, 8, 10, 12, 14, 16]));

// Tabulation
const canSumTable = (targetSum: number, numbers: number[]): boolean => {
  const table = Array(targetSum + 1).fill(false);
  table[0] = true;

  for (let i = 0; i < targetSum + 1; i++) {
    if (table[i]) {
      for (const num of numbers) {
        table[i + num] = true;
      }
    }
  }

  return table[targetSum];
};

console.log("DP - table ↓");
measure(() => canSumTable(20, [1, 3, 5, 7, 9]));
measure(() => canSumTable(7, [5, 3, 4, 7]));
measure(() => canSumTable(250, [7, 14]));
measure(() => canSumTable(15001, [2, 4, 6, 8, 10, 12, 14, 16]));
measure(() => canSumTable(25001, [2, 4, 6, 8, 10, 12, 14, 16]));
