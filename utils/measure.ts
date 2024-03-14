export const measure = <A>(executedFunction: () => A) => {
  const start = performance.now();
  const memoryStart = process.memoryUsage().heapUsed;
  const result = executedFunction();
  const end = performance.now();
  const memoryEnd = process.memoryUsage().heapUsed;

  console.log(
    result,
    `   ${end - start}ms, ${(memoryEnd - memoryStart) / 1000}KB`
  );
};
