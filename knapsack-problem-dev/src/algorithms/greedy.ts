import type { IGreedyStep } from "../types/ISteps";


function greedyKnapsack(
  weights: number[],
  values: number[],
  W: number
) {
  const items = weights.map((w, i) => ({
    weight: w,
    value: values[i],
    ratio: w === 0 ?0: values[i] / w,
  }));
            const start = performance.now();

  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let currentWeight = 0;

  const steps: IGreedyStep[] = [];

  for (const item of items) {
    const remain = W - currentWeight;
    if ( item.weight <= remain) {
      currentWeight += item.weight;
      totalValue += item.value;

      steps.push({
        ...item,
        currentWeight,
        totalValue,
        decision: "fit",
      });
    } else if(remain > 0) {
      steps.push({
         ...item,
        currentWeight,
        totalValue,
        decision: "partial",
      });
    }
      else {
      steps.push({
         ...item,
        currentWeight,
        totalValue,
        decision: "not fit",
      });
    }
  }
            const end = performance.now();
            const time =Number((end - start).toFixed(6))

  return {
    totalValue,
    steps,
    time
  };
}

export default greedyKnapsack;