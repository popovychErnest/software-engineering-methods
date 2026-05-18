import type { IBruteForceStep, IDpStep } from "./ISteps"

export type AlgorithmName = "dp" |  "bruteforce";
export type TAlgorithmStatus = "unavailable" | "running"| "finished" | "paused";

// |  "greedy"

export type DpAlgorithm =  {
        steps: IDpStep[],
        time: number
    };
export type BruteForceAlgorithm = Pick<DpAlgorithm, "time"> & {maxValue: number, steps: IBruteForceStep[]} 

export type IAlgorithms = {
    "dp": DpAlgorithm;
    "bruteforce": BruteForceAlgorithm,
}

