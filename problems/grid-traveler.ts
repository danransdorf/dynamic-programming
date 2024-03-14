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
const gridTravelerMemo = (
  w: number,
  h: number,
  memo: Record<string, number> = {}
): number => {
  if (w == 0 || h == 0) return 0;
  if (w == 1 || h == 1) return 1;

  const key = Math.min(w, h) + "," + Math.max(w, h);
  if (key in memo) return memo[key];

  memo[key] =
    gridTravelerMemo(w - 1, h, memo) + gridTravelerMemo(w, h - 1, memo);
  return memo[key];
};

console.log("DP - memo ↓");
measure(() => gridTravelerMemo(10, 10));
measure(() => gridTravelerMemo(10, 15));
measure(() => gridTravelerMemo(17, 15));
measure(() => gridTravelerMemo(500, 500));
measure(() => gridTravelerMemo(2000, 2000));

// Tabulation
const gridTravelerTable = (w: number, h: number): number => {
  const table = Array(h).fill(Array(w).fill(undefined));
  try {
    table[0][0] = 1;
  } catch (e) {
    return 0;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      table[y][x] =
        ((table[y - 1] ?? [0])[x] ?? 0) + (table[y][x - 1] ?? 0) || 1;
    }
  }

  return table[h - 1][w - 1] ?? 0;
};
console.log("DP - table ↓");
measure(() => gridTravelerTable(10, 10));
measure(() => gridTravelerTable(10, 15));
measure(() => gridTravelerTable(17, 15));
measure(() => gridTravelerTable(500, 500));
measure(() => gridTravelerTable(2000, 2000));
