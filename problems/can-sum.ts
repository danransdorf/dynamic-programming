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

const canSum = (
  targetSum: number,
  numbers: number[],
  memo: Record<number, boolean> = {}
): boolean => {
  if (targetSum == 0) return true;
  if (targetSum < 0) return false;
  if (targetSum in memo) return memo[targetSum];

  for (const num of numbers) {
    if (canSum(targetSum - num, numbers, memo)) return true;
    memo[targetSum - num] = false;
  }

  return false;
};

console.log("DP - memo ↓");
measure(() => canSum(20, [1, 3, 5, 7, 9]));
measure(() => canSum(7, [5, 3, 4, 7]));
measure(() => canSum(250, [7, 14]));
measure(() => canSum(15001, [2, 4, 6, 8, 10, 12, 14, 16]));
