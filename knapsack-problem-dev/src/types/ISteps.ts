

export interface IDpStep  {
  i: number,
  w: number,
  value: number,
  dpCurrState: number[][] 
}

// export type TBFDecision = "skip" | "take" | "root";
export type TGDecision = "fit" | "not fit" | "partial";
// export type TBranchBoundsDecision = TBFDecision | "exit"| "prune"| "visit";

export type DecisionMap = {
  bruteforce: "skip" | "take" | "root";
  branch_bounds:"skip" | "prune" | "visit" | "root";
};


// for bruteforce and branch & bounds
interface GraphStep {
  id: string,
  i: number,
  w: number,
  value: number,
  level: number,
  parentId: string | null
}
export type TGraphStep<K extends keyof DecisionMap> = GraphStep &  {
  decision: DecisionMap[K];
};

export type TBruteForceStep = TGraphStep<"bruteforce">
export type  TBranchBoundsStep = TGraphStep<"branch_bounds">

interface GreedyStepItem  {
  weight: number,
  value: number,
  ratio: number
}
export interface IGreedyStep extends GreedyStepItem  {
  currentWeight: number,
  totalValue: number,
  decision: TGDecision,
}

