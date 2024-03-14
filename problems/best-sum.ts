/*
Given number 'targetSum' and an array of numbers 'numbers', return an array
of the shortest combination of numbers from 'numbers' that adds up to 'targetSum'.
If there is no combination, return null. Use the elements from 'numbers' as many times as you need.
*/

import { measure } from "../utils/measure";

const bestSumBasic = (
  targetSum: number,
  numbers: number[]
): number[] | null => {
  if (targetSum < 0) return null;
  if (targetSum == 0) return [];

  let bestCombination: number[] | null = null;
  for (const num of numbers) {
    const newTarget = targetSum - num;
    const res = bestSumBasic(newTarget, numbers);
    if (res) {
      const combination = [num, ...res];
      if (!bestCombination || combination.length < bestCombination?.length) {
        bestCombination = combination;
      }
    }
  }

  return bestCombination;
};

measure(() => bestSumBasic(20, [1, 3, 5, 7, 9]));
measure(() => bestSumBasic(7, [5, 3, 4, 7]));
measure(() => bestSumBasic(250, [7, 14]));

const bestSum = (
  targetSum: number,
  numbers: number[],
  memo: Record<number, number[] | null> = {}
): number[] | null => {
  if (targetSum < 0) return null;
  if (targetSum == 0) return [];
  if (targetSum in memo) return memo[targetSum];

  let bestCombination: number[] | null = null;
  for (const num of numbers) {
    const newTarget = targetSum - num;
    const res = bestSum(newTarget, numbers, memo);
    if (res) {
      const combination = [num, ...res];
      if (!bestCombination || combination.length < bestCombination?.length) {
        bestCombination = combination;
      }
    }
  }

  memo[targetSum] = bestCombination;
  return memo[targetSum];
};

console.log("DP - memo ↓");
measure(() => bestSum(20, [1, 3, 5, 7, 9]));
measure(() => bestSum(7, [5, 3, 4, 7]));
measure(() => bestSum(250, [7, 14]));
measure(() => bestSum(15001, [2, 4, 6, 8, 10, 12, 14, 16]));
measure(() => bestSum(15001, [1, 2, 3, 4, 5, 6, 7, 8, 16, 32, 64, 128]));
