import { useEffect, useEffectEvent, useState,  type SubmitEvent } from "react";
import { generateValues } from "./helpers/generateValues";
import {type AlgorithmTypes, type IAlgorithms } from "./types/IAlgorithms";
import { AlgorithmSelector } from "./AlgorithmSelector";
import { useAlgorithms } from "./hooks/useAlgorithms";
import {motion, steps, useAnimate, useAnimation} from "framer-motion";
import type { IStep } from "./types/IStep";
import knapsack from "./algorithms/dp";
import StopALgoButton from "./components/StopAlgoButton";


interface InputProps {
    setWeights: React.Dispatch<React.SetStateAction<number[]>>;
    setValues: React.Dispatch<React.SetStateAction<number[]>>;
    setKnapsackWeight: React.Dispatch<React.SetStateAction<number>>;
    setSteps: React.Dispatch<React.SetStateAction<IStep[]>>;
    // setDp: React.Dispatch<React.SetStateAction<number[][]>>;
    pauseAlgorithms: (val: "all" | AlgorithmTypes) => void;
    handleResetStep: () => void;
    currentStep: number,
    isAlgoRunning: boolean
}

export const Input = ({
    setWeights, 
    setValues,
    setKnapsackWeight,
    setSteps,
    // setDp,
    pauseAlgorithms,
    handleResetStep,
    currentStep,
    isAlgoRunning
    
}: InputProps) => {

    const controls = useAnimation();

    const [selectedAlgorithms, setSelectedAlgorithms] = useState<IAlgorithms>({dp: false})
    const [isOpened, setIsOpened] = useState<boolean>(true);

    const {activeAlgorithms, setActiveAlgorithms} = useAlgorithms();

    const [inputWeights, setInputWeights] = useState<string>("");
    const [inputValues, setInputValues] = useState<string>("");
    const [inputCapacity, setInputCapacity] = useState<string>("");

    const [errors, setErrors] = useState<string[]>([]);

    const parseArray = (data: string): number[] | null => {

        const trimmed = data.trim();
        if (
            !trimmed.startsWith("[") ||
            !trimmed.endsWith("]")
        ) {
            return null;
        }
        const parsed = trimmed
            .slice(1, -1)
            .split(",")
            .map(el => Number(el.trim()));

        const hasNaN = parsed.some(num => Number.isNaN(num));

        if (hasNaN) return null;

        return parsed;
    };

    useEffect(() => {
        if (isAlgoRunning) return
        setIsOpened(true);
    }, [isAlgoRunning]) 

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: string[] = [];

        const parsedValues = parseArray(inputValues);
        const parsedWeights = parseArray(inputWeights);
        const parsedCapacity = Number(inputCapacity);

        // validation

        if (!parsedValues) {
            newErrors.push("Incorrect values array format");
        }

        if (!parsedWeights) {
            newErrors.push("Incorrect weights array format");
        }

        if (Number.isNaN(parsedCapacity)) {
            newErrors.push("Knapsack weight must be a number");
        }

        if (parsedCapacity > 40) {
            newErrors.push("Knapsack weight is too much!");
        }
        if (
            parsedValues &&
            parsedWeights &&
            parsedValues.length !== parsedWeights.length
        ) {
            newErrors.push("Values and weights length mismatch");
        }
        setErrors(newErrors);

        if (newErrors.length > 0) return;

        // state update in Main.tsx
        setValues(parsedValues!);
        setWeights(parsedWeights!);
        setKnapsackWeight(parsedCapacity);
        if (parsedValues && parsedWeights) {
            // setDp(Array.from({length: parsedWeights.length + 1}, () => Array(parsedCapacity + 1).fill(0)));
            
            // run dp algorithm
            setSteps(knapsack(parsedWeights, parsedValues, parsedCapacity).steps);
            handleResetStep();
            
            
            // setDp(knapsack(parsedWeights, parsedValues, parsedCapacity).dp);
            // const {dp} = knapsack(parsedWeights, parsedValues, parsedCapacity);
        }

        setActiveAlgorithms(selectedAlgorithms)

        if (Object.values(selectedAlgorithms).every(el => el == false)) {
            setSelectedAlgorithms(prev => ({...prev, dp: true}))
            setActiveAlgorithms(prev => ({...prev, dp: true}))
        }

        setIsOpened(false);
    };


    // const generatedImpulse = () => {

    // }

    return (
        <motion.div drag dragMomentum = {false} initial = {{height: "25rem"}} animate = {{height: isOpened ? "25rem" : "4rem"}} className={` z-50 right-4 top-4 overflow-hidden w-[40rem] p-6 absolute   rounded-2xl  bg-neutral-700 ${isOpened ? "h-[25rem] pt-12" : "  flex flex-row justify-center items-center"}`}>
                <button onClick={() => setIsOpened(prev => !prev)} className="text-white font-semibold text-2xl transition transform-[rotate(90deg)] absolute left-[1rem] top-4" style={{transform: isOpened ? "rotate(90deg)" : "rotate(270deg)  "}}>{">"}</button>
            <form
                 onSubmit={handleSubmit} 
                 className="flex flex-col gap-5">

                {/* VALUES */}

                <motion.section initial ={{opacity: 1}} animate = {{opacity: isOpened ? 1 : 0 }}  className={` ${isOpened ? " opacity-100" : "bottom-200 absolute pointer-none select-none opacity-0"
                } transition flex space-x-4 flex-row`}>
                <div className="w-full space-y-4">

                <div className="flex flex-col gap-1">
                     <label htmlFor="values" className="text-white"> 
                         Enter values array:
                    </label> 

                    <input
                    autoComplete="off"
                    required
                    disabled ={Object.values(activeAlgorithms).some(el => el == true)}
                        value={inputValues}
                        onChange={(e) => setInputValues(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-500 text-white outline-none border border-transparent focus:border-white"
                        type="text"
                        name = "values"
                        placeholder="[7,15,15,11]"
                    />
                </div>

                {/* WEIGHTS */}
  
                <div className="flex flex-col gap-1">
                    <label className="text-white">
                        Enter weights array:
                    </label> 
                    <input
                    required
                    disabled ={Object.values(activeAlgorithms).some(el => el == true)}
                    autoComplete="off"
                        value={inputWeights}
                        onChange={(e) => setInputWeights(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-500 text-white outline-none  focus:border-white"
                        type="text"
                        placeholder="[3,10,1,4]"
                    />
                </div>

                {/* CAPACITY */}

                <div className="flex flex-col gap-1">
                    <label className="text-white">
                        Enter knapsack capacity:
                    </label> 

                    <input
                    autoComplete="off"
                    required

                    disabled ={Object.values(activeAlgorithms).some(el => el == true)}

                        value={inputCapacity}
                        onChange={(e) => setInputCapacity(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-500 text-white"
                        placeholder="18"
                    />
                </div>

                </div>
            <AlgorithmSelector selectedAlgorithms = {selectedAlgorithms} setSelectedAlgorithms = {setSelectedAlgorithms}></AlgorithmSelector>
                </motion.section>

                {/* ERRORS */}

                {errors.length > 0 && (
                    <div className="rounded-xl bg-red-500/20 border border-red-500 p-4">
                        <ul className="text-red-300 space-y-1">
                            {errors.map((err, index) => (
                                <li key={index}>
                                    • {err}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* BUTTON */}
                <motion.div layout className={`flex justify-between  h-fit items-center  gap-6  ${isOpened ? "w-full" :  "absolute w-[95%] right-0 top-0 h-full px-2  items-center align-top"}`}>


                  
                 <motion.button
                animate = {controls}
                 disabled ={Object.values(activeAlgorithms).some(el => el == true)} onClick={() => {
                  const {vs,ws,W } = generateValues();
                  setInputValues(vs.toString());
                  setInputWeights(ws.toString());
                  setInputCapacity(W.toString());

                  controls.start({scale: 1.1});

                //   reset table
                    handleResetStep()

                  setTimeout(() => {
                        controls.start({scale: 1})
                  }, 100)
                }
            }
                    type="button"
                    className="rounded-xl bg-neutral-800 text-white font-semibold border border-neutral-500 py-3 px-3 hover:opacity-80 transition"
                >
                    Random values
                </motion.button> 

                <div className={`flex flex-row relative justify-center  space-x-2 ${isOpened ? "static" : " flex justify-center  items-center "}`} >
{isAlgoRunning &&
 <motion.div animate={{rotate: 360}}  transition={{
    repeat: Infinity,
    duration: 1,
    ease: "anticipate"
  }} className=" w-6 h-full   ">
                        <svg className="h-6 w-6" fill="white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="6"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path> </g></svg>
                    </motion.div>
}

                    <StopALgoButton handlePauseAlgorithms={() => pauseAlgorithms("all")} setIsOpened={setIsOpened}></StopALgoButton>

                <button style = {{}}
                disabled ={Object.values(activeAlgorithms).some(el => el == true) ||  (currentStep != 0 && currentStep === steps.length - 1)}
                    type="submit"
                    className={` rounded-xl bg-white text-black font-semibold  py-3 px-3 hover:opacity-80 transition`}
                >
                    Run
                </button> 
                </div>

                </motion.div>
            </form>
            {/* <section></section> */}
        </motion.div>
    );
};
