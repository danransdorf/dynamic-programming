/*
Given number 'targetSum' and an array of numbers 'numbers', return an array
of any combination that adds up to 'targetSum' using
numbers from 'numbers'. If there is no combination, return null. 
Use the elements from 'numbers' as many times as you need.
*/

import { measure } from "../utils/measure";

const howSumBasic = (targetSum: number, numbers: number[]): number[] | null => {
  if (targetSum < 0) return null;

  for (const num of numbers) {
    const newTarget = targetSum - num;
    if (newTarget == 0) return [num];
    const res = howSumBasic(newTarget, numbers);
    if (res) return [num, ...res];
  }

  return null;
};

measure(() => howSumBasic(20, [1, 3, 5, 7, 9]));
measure(() => howSumBasic(7, [5, 3, 4, 7]));
measure(() => howSumBasic(250, [7, 14]));

// Memoization
const howSumMemo = (
  targetSum: number,
  numbers: number[],
  memo: Record<number, null> = {}
): number[] | null => {
  if (targetSum < 0) return null;
  if (targetSum == 0) return [];
  if (targetSum in memo) return memo[targetSum];

  for (const num of numbers) {
    const newTarget = targetSum - num;
    const res = howSumMemo(newTarget, numbers, memo);
    if (res) return [num, ...res];
    memo[newTarget] = null;
  }

  return null;
};

console.log("DP - memo ↓");
measure(() => howSumMemo(20, [1, 3, 5, 7, 9]));
measure(() => howSumMemo(7, [5, 3, 4, 7]));
measure(() => howSumMemo(250, [7, 14]));
measure(() => howSumMemo(15001, [2, 4, 6, 8, 10, 12, 14, 16]));
measure(() => howSumMemo(25001, [2, 4, 6, 8, 10, 12, 14, 16]));
/* measure(() => howSum(15001, [14,15])); */

// Tabulation
const howSumTable = (targetSum: number, numbers: number[]): number[] | null => {
  const table: number[] = Array(targetSum + 1).fill(null);
  table[0] = 1;

  for (let i = 0; i < targetSum + 1; i++) {
    if (table[i]) {
      for (const num of numbers) {
        table[i + num] = num;
      }
    }
  }
  if (table[targetSum] === null) return null;

  const res = [];
  for (let i = targetSum; i > 0; null) {
    res.push(table[i]);
    i -= table[i];
  }

  return res;
};

console.log("DP - table ↓");
measure(() => howSumTable(20, [1, 3, 5, 7, 9]));
measure(() => howSumTable(7, [5, 3, 4, 7]));
measure(() => howSumTable(250, [7, 14]));
measure(() => howSumTable(15001, [2, 4, 6, 8, 10, 12, 14, 16]));
measure(() => howSumTable(25001, [2, 4, 6, 8, 10, 12, 14, 16]));
