// Given a 'w' by 'h' grid, how many ways can a person go from top left to bottom right corner without taking steps away from the target (up, left).

import { measure } from "../utils/measure";

const gridTravelerBasic = (w: number, h: number): number =>
  w == 0 || h == 0
    ? 0
    : w == 1 || h == 1
    ? 1
    : gridTravelerBasic(w - 1, h) + gridTravelerBasic(w, h - 1);

measure(() => gridTravelerBasic(10, 10));
measure(() => gridTravelerBasic(10, 15));
measure(() => gridTravelerBasic(17, 15));

// Memo
const gridTraveler = (
  w: number,
  h: number,
  memo: Record<string, number> = {}
): number => {
  if (w == 0 || h == 0) return 0;
  if (w == 1 || h == 1) return 1;

  const key = Math.min(w, h) + "," + Math.max(w, h);
  if (key in memo) return memo[key];

  memo[key] = gridTraveler(w - 1, h, memo) + gridTraveler(w, h - 1, memo);
  return memo[key];
};

console.log("DP ↓")
measure(() => gridTraveler(10, 10));
measure(() => gridTraveler(10, 15));
measure(() => gridTraveler(17, 15));
measure(() => gridTraveler(500, 500));
