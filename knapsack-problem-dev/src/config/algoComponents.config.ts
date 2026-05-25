import DynamicProgramming from "../dynamic-programming/DynamicProgramming";
import BruteForce from "../brute-force/BruteForce";
import Greedy from "../greedy/Greedy";
import BranchBounds from "../branch/BranchBounds";

import {type TAlgorithmComponentMap } from "../types/IAlgorithmComponent";

// algo component config
export const algorithmComponents = {
  dp: {
    component: DynamicProgramming,
  },
  bruteforce: {
    component: BruteForce,
  },
  greedy: {
    component: Greedy,
  },
  branch_bounds: {
    component: BranchBounds,
  },
} as const;

export type AlgorithmName =  keyof typeof algorithmComponents;
