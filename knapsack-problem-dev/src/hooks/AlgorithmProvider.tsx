import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { type IAlgorithms } from "../types/IAlgorithms";

type AlgorithmContextType = {
    activeAlgorithms: IAlgorithms,
    setActiveAlgorithms: Dispatch<SetStateAction<IAlgorithms>>; 
}

export const AlgorithmsContext = createContext<AlgorithmContextType | null>(null)

export const AlgorithmsProvider = ({children}: {children: ReactNode}) => {
     const [activeAlgorithms, setActiveAlgorithms] = useState<IAlgorithms>({dp: false});

    return (
    <AlgorithmsContext.Provider value={{activeAlgorithms, setActiveAlgorithms}}>
        {children}
    </AlgorithmsContext.Provider>
    )
}