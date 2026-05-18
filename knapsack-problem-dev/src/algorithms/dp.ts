import type { IDpStep } from "../types/ISteps";

export default function dpKnapsack(weights: number[], values: number[], W: number) {
  // start time
  const start = performance.now();
  
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(W + 1).fill(0)
  );
  const steps: IDpStep[] = [];   

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      const weight = weights[i - 1];
      const value = values[i - 1];

      let newValue = dp[i - 1][w]

      if (weight <= w) {
        newValue = Math.max(
          dp[i - 1][w],                  
          dp[i - 1][w - weight] + value 
        )
      }
      dp[i][w] = newValue;
      
      steps.push({
        i,
        w,
        value: newValue,
        dpCurrState: structuredClone(dp)  
      })
      
    } 
  }
  const end = performance.now();
  const time = Number((end - start).toFixed(4));
  
  console.log("result: ", dp);

  return {steps, time};
}

export const getItems = (dp: number[][], weights: number[], W: number) => {
  let i = weights.length;
  let w = W;
  const items = [];

  while (i > 0 && w > 0) {
    if (dp[i][w] !== dp[i - 1][w]) {
      items.push(i); 
      w -= weights[i - 1];
    }
    i--;
  }

  return items.reverse();
}
