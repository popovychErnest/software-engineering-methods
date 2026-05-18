import bruteForceKnapsack from "../algorithms/bruteforce";
import dpKnapsack from "../algorithms/dp";
import type { BruteForceAlgorithm, DpAlgorithm } from "../types/IAlgorithms";
import type { IBruteForceStep } from "../types/ISteps";

// function chooseAlgorithm(type: "dp", weights: number[], values: number[], capacity: number): DpAlgorithm;
// function chooseAlgorithm(type: "bruteforce", weights: number[], values: number[], capacity: number): BruteForceAlgorithm; 

type AlgorithmTypeMap = {
    dp: DpAlgorithm,
    bruteforce: BruteForceAlgorithm
}

function chooseAlgorithm<T extends keyof AlgorithmTypeMap> (type: T, weights: number[], values: number[], capacity: number): AlgorithmTypeMap[T] {
    switch (type) {
        case "dp": {
            const result =  dpKnapsack(weights, values, capacity)
            return result as AlgorithmTypeMap[T];
        };
        case "bruteforce": {
            const start = performance.now();
            const steps:IBruteForceStep[] = [];

            const  maxValue = bruteForceKnapsack(weights, values, capacity, weights.length,0, steps, null,0, "root"); 
            // alert("BF STEPS: " + JSON.stringify(steps));
            const end = performance.now();
            const time =Number((end - start).toFixed(4))
            // alert("TIME FOR THIS: " + time);


            return {steps, maxValue, time} as AlgorithmTypeMap[T];
        };
    }
}

export default chooseAlgorithm