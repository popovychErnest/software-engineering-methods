import type { IDpStep, IGreedyStep, TBranchBoundsStep, TBruteForceStep } from "./ISteps"

type SpecialStatus = "restart";
export type TAlgorithmStatus = "unavailable" | "running"| "finished" | "paused" | SpecialStatus;

type BaseAlgorithm = {
    time: number
}

export type TDpAlgorithm = {steps: IDpStep[] } & {time: number};
export type TGreedyAlgorithm = {steps: IGreedyStep[], totalValue: number} & {time: number}; 
export type TBruteForceAlgorithm = {steps: TBruteForceStep[]; maxValue: number} & {time: number};
export type TBranchBoundsAlgorithm = {steps: TBranchBoundsStep[], maxValue: number} & {time: number};  

export type IAlgorithms = {
    "dp": TDpAlgorithm;
    "bruteforce": TBruteForceAlgorithm;
    "greedy": TGreedyAlgorithm;
    "branch_bounds": TBranchBoundsAlgorithm;
}

