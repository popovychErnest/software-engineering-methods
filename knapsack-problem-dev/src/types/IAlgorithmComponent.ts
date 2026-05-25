import type { Dispatch, JSX, SetStateAction } from "react";
import type { TAlgorithmStatus, IAlgorithms, TDpAlgorithm, TBranchBoundsAlgorithm, TGreedyAlgorithm, TBruteForceAlgorithm } from "./IAlgorithms"; 
import type { AlgorithmName } from "../config/algoComponents.config";


// props type
export interface IAlgorithmComponentProps<K extends AlgorithmName>  {
  type: K;
  weights: number[];
  values: number[];
  knapsackWeight: number;
  
  // IAlgorithms.ts
  algorithm: IAlgorithms[K];
  
  currentStep: number;
  setCurrentSteps: Dispatch<SetStateAction<Record<AlgorithmName, number>>>;

  controlAlgorithm: (state: TAlgorithmStatus, param: "all" | AlgorithmName) => void;
  
  status: TAlgorithmStatus;

  bounds: React.RefObject<HTMLElement | null>;
} 

// map of props for components
type TAlgorithmComponentPropsMap = {
  [K in AlgorithmName]: IAlgorithmComponentProps<K>
 }

// create type of component with props
export type AlgorithmComponent<K extends AlgorithmName> =
(props: TAlgorithmComponentPropsMap[K]) => JSX.Element;

// create map of components
export type TAlgorithmComponentMap = {
  [K in AlgorithmName]: AlgorithmComponent<K>
}