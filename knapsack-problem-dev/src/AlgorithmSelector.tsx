import type { AlgorithmName } from "./types/IAlgorithms";
import type { Dispatch, SetStateAction } from "react";


type TSelectedAlgorithms = Record<AlgorithmName, boolean>;
interface IAlgorithmSelector  {
    selectedAlgorithms: TSelectedAlgorithms,
    setSelectedAlgorithms: Dispatch<SetStateAction<TSelectedAlgorithms>>;
}

export function AlgorithmSelector({selectedAlgorithms,setSelectedAlgorithms}: IAlgorithmSelector) {

  const toggle = (key: AlgorithmName) => {
    setSelectedAlgorithms(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getLabelName = (k: AlgorithmName) => {
    switch(k) {
        case "dp": return "Dynamic Programming";
        case "bruteforce": return "Brute Force"; 
        case "greedy": return "Greedy"; 
        case "branch_bounds": return "Branch and Bounds"; 
    } 
  } 
  return (
    <div className="flex flex-col gap-3 text-white border border-neutral-600 min-w-60 w-fit rounded-2xl p-2">
      <p className="font-semibold">Select algorithms:</p>

    {(Object.keys(selectedAlgorithms) as AlgorithmName[]).map(k => {

      return (<label key ={k} className="flex items-center gap-2">
        <input type="checkbox" checked={selectedAlgorithms[k]} onChange={() => toggle(k)} />
        {getLabelName(k)}
      </label>)
    })}
    </div>
  );
}