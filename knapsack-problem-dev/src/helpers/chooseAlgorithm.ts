import branchBoundsKnapsack from "../algorithms/branch";
import bruteForceKnapsack from "../algorithms/bruteforce";
import dpKnapsack from "../algorithms/dp";
import greedyKnapsack from "../algorithms/greedy";
import type { TBranchBoundsAlgorithm, TBruteForceAlgorithm, TDpAlgorithm, TGreedyAlgorithm } from "../types/IAlgorithms";
import type { TBruteForceStep, IGreedyStep, TBranchBoundsStep } from "../types/ISteps";

// function chooseAlgorithm(type: "dp", weights: number[], values: number[], capacity: number): DpAlgorithm;
// function chooseAlgorithm(type: "bruteforce", weights: number[], values: number[], capacity: number): BruteForceAlgorithm; 

type AlgorithmTypeMap = {
    dp: TDpAlgorithm;
    bruteforce: TBruteForceAlgorithm;
    greedy: TGreedyAlgorithm;
    branch_bounds: TBranchBoundsAlgorithm;
}

function chooseAlgorithm<T extends keyof AlgorithmTypeMap> (type: T, weights: number[], values: number[], capacity: number): AlgorithmTypeMap[T] {
    switch (type) {
        case "dp": {
            const result =  dpKnapsack(weights, values, capacity)
            return result as AlgorithmTypeMap[T];
        };
        case "bruteforce": {
            const start = performance.now();
            const steps:TBruteForceStep[] = [];
            const  maxValue = bruteForceKnapsack(weights, values, capacity, weights.length,0, steps, null,0, "root"); 
            const end = performance.now();
            const time =Number((end - start).toFixed(6))
            return {steps, maxValue, time} as AlgorithmTypeMap[T];
        };
          case "greedy": {
            const  {totalValue, steps, time} = greedyKnapsack(weights, values, capacity); 
            return {steps, time, totalValue} as AlgorithmTypeMap[T];
        };

         case "branch_bounds": {
            const start = performance.now();
            const nodeId = crypto.randomUUID();
            const steps:TBranchBoundsStep[] = [];
            const  maxValue = branchBoundsKnapsack(weights, values, capacity, 0,0, steps, nodeId, 0, {value: 0}, "root"); 
            const end = performance.now();
            const time =Number((end - start).toFixed(6))
            return {steps, maxValue, time} as AlgorithmTypeMap[T];
        };
    }
}

export default chooseAlgorithm