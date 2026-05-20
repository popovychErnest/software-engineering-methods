import type { IDpStep, IGreedyStep, TBranchBoundsStep, TBruteForceStep } from "./ISteps"

export type AlgorithmName = "dp" |  "bruteforce" | "greedy" | "branch_bounds";
type SpecialStatus = "restart";
export type TAlgorithmStatus = "unavailable" | "running"| "finished" | "paused" | SpecialStatus;

type BaseAlgorithm = {
    time: number
}

export type TDpAlgorithm = {steps: IDpStep[] } & BaseAlgorithm;
export type TGreedyAlgorithm = {steps: IGreedyStep[], totalValue: number} & BaseAlgorithm; 
export type TBruteForceAlgorithm = {steps: TBruteForceStep[]; maxValue: number} & BaseAlgorithm;
export type TBranchBoundsAlgorithm = {steps: TBranchBoundsStep[], maxValue: number} & BaseAlgorithm;  

export type IAlgorithms = {
    "dp": TDpAlgorithm;
    "bruteforce": TBruteForceAlgorithm;
    "greedy": TGreedyAlgorithm;
    "branch_bounds": TBranchBoundsAlgorithm;
}

