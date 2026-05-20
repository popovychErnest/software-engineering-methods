import type { TBruteForceStep } from "../types/ISteps";

function bruteForceKnapsack (weights: number[], values: number[], W: number, n: number, currentValue: number, steps: TBruteForceStep[], parentId: string | null, level: number, decision: "root" | "skip" | "take"): number {
    const nodeId = crypto.randomUUID();
    steps.push({id:nodeId, i: n, w: W, value: currentValue, decision:decision, level: level, parentId: parentId });

  if (n === 0 || W === 0) {
    return currentValue;
  }

  if (weights[n - 1] > W) {
    return bruteForceKnapsack(
      weights,
      values,
      W,
      n - 1,
      currentValue,
      steps,
      nodeId,
      level + 1,
      "skip"
    );
  }

  const skip = bruteForceKnapsack(
    weights,
    values,
    W,
    n - 1,
    currentValue,
    steps,
      nodeId,
      level + 1,
    "skip"
  );

  const take = bruteForceKnapsack(
    weights,
    values,
    W - weights[n - 1],
    n - 1,
    currentValue + values[n - 1],
    steps,
      nodeId,
      level + 1,
    "take"
  );

  return Math.max(skip, take);
}


export default bruteForceKnapsack;