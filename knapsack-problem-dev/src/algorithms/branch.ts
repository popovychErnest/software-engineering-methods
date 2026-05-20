import type Branch from "../branch/BranchBounds.tsx";
import type { DecisionMap, TBranchBoundsStep, TGDecision } from "../types/ISteps.ts";
import getBound from "./getBound.ts";

function branchBoundsKnapsack(
  weights: number[],
  values: number[],
  W: number,
  i: number,
  currentValue: number,
  steps: TBranchBoundsStep[],
  parentId: string | null,
  level: number,
  best: { value: number },
  decision: DecisionMap["branch_bounds"]

): number {
  const nodeId = crypto.randomUUID();

  steps.push({
    id: nodeId,
    i,
    w: W,
    value: currentValue,
    level,
    parentId,
    decision: decision,
  });

  // 🧱 base case
  if (i === weights.length || W === 0) {
    best.value = Math.max(best.value, currentValue);
    return currentValue;
  }

  // 🧠 BOUND
  const bound = getBound(i, W, currentValue, weights, values);

  // ❌ PRUNE
  if (bound <= best.value) {
    steps.push({
      id: crypto.randomUUID(),
      i,
      w: W,
      value: currentValue,
      level,
      parentId: nodeId,
      decision: "prune",
    });
    return currentValue;
  }

  // 🌿 TAKE
  let take = currentValue;

  if (weights[i] <= W) {
    take = branchBoundsKnapsack(
      weights,
      values,
      W - weights[i],
      i + 1,
      currentValue + values[i],
      steps,
      nodeId,
      level + 1,
      best,
      "visit"
    );
  }

  // 🌿 SKIP
  const skip = branchBoundsKnapsack(
    weights,
    values,
    W,
    i + 1,
    currentValue,
    steps,
    nodeId,
    level + 1,
    best,
    "skip"
  );

  const res = Math.max(skip, take);

  best.value = Math.max(best.value, res);

  return res;
}
export default branchBoundsKnapsack;