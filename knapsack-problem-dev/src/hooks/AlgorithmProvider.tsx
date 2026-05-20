import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { type IAlgorithms } from "../types/IAlgorithms";
import { steps } from "framer-motion";

type AlgorithmContextType = {
    algorithms: IAlgorithms,
    setAlgorithms: Dispatch<SetStateAction<IAlgorithms>>; 
}

export const AlgorithmsContext = createContext<AlgorithmContextType | null>(null)

export const AlgorithmsProvider = ({children}: {children: ReactNode}) => {
     const [algorithms, setAlgorithms] = useState<IAlgorithms>(
        {dp:{steps: [], time: 0}, bruteforce:{maxValue: 0, time: 0, steps:[]}, greedy:{time: 0, steps:[], totalValue:0}, branch_bounds: {time: 0, steps:[], maxValue:0}});

    return (
    <AlgorithmsContext.Provider value={{algorithms, setAlgorithms}}>
        {children}
    </AlgorithmsContext.Provider>
    )
}