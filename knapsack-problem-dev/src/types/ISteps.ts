

export interface IDpStep  {
  i: number,
  w: number,
  value: number,
  dpCurrState: number[][] 
}

export type TBfDecision = "exit" | "skip" | "take" | "root";

export interface IBruteForceStep  {
  id: string,
  i: number,
  w: number,
  value: number,
  decision: TBfDecision,
  level: number,
  parentId: string | null
}