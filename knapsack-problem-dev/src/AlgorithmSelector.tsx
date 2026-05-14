import type { AlgorithmTypes, IAlgorithms } from "./types/IAlgorithms";
import type { Dispatch, SetStateAction } from "react";

interface IAlgorithmSelector  {
    selectedAlgorithms: IAlgorithms,
    setSelectedAlgorithms: Dispatch<SetStateAction<IAlgorithms>>;
}

export function AlgorithmSelector({selectedAlgorithms,setSelectedAlgorithms}: IAlgorithmSelector) {

  const toggle = (key: AlgorithmTypes) => {
    setSelectedAlgorithms(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getLabelName = (k: AlgorithmTypes) => {
    switch(k) {
        case "dp": return "Dynamic Programming";
        // case "greedy": return "Greedy"; 
        // case "bruteforce": return "Brute Force"; 
    } 
  } 
  return (
    <div className="flex flex-col gap-3 text-white border border-neutral-600 min-w-60 w-fit rounded-2xl p-2">
      <p className="font-semibold">Select algorithms:</p>

    {(Object.keys(selectedAlgorithms) as AlgorithmTypes[]).map(k => {

      return (<label key ={k} className="flex items-center gap-2">
        <input type="checkbox" checked={selectedAlgorithms[k]} onChange={() => toggle(k)} />
        {getLabelName(k)}
      </label>)
    })}
    </div>
  );
}