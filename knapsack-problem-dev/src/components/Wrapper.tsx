import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { delay, motion, scale } from "framer-motion";
import type { TAlgorithmStatus, TDpAlgorithm } from "../types/IAlgorithms";
import { animation, handleTextAppear } from "../helpers/AlgorithmShakeAnimation";
import RunAlgoButton from "../components/RunAlgoButton";
import { type AlgorithmName } from "../config/algoComponents.config";
interface IDynamicProgramming {
  weights: number[];
  values: number[];
  knapsackWeight: number;
  
  algorithm: TDpAlgorithm;
  
  currentStep: number;
  setCurrentSteps: Dispatch<SetStateAction<Record<AlgorithmName, number>>>;

  controlAlgorithm: (state: TAlgorithmStatus, param: "all" | AlgorithmName) => void;
  
  type: AlgorithmName;
  status: TAlgorithmStatus;

  bounds: React.RefObject<HTMLElement | null>;
}

function DynamicProgramming({
  
  type,
  
  weights,
  values,
  knapsackWeight,

  algorithm,
  currentStep,
  setCurrentSteps,

  status,

  controlAlgorithm,

  bounds,
}: IDynamicProgramming) { 
  const windowRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const current = algorithm.steps[currentStep];
  const steps = algorithm.steps;


  const dp = algorithm.steps[currentStep].dpCurrState;
  const time = algorithm.time;

  const algoFinished = steps.length-1 === currentStep;

  // if less than next - skip
  const skipValue = dp[current.i-1][current.w];

  // if bigger than prev - take
  const takeValue = current.w >= weights[current.i - 1]
    ? (dp[current.i - 1]?.[current.w - weights[current.i - 1]] ?? 0) + values[current.i - 1]
    : null;

    const isNewValTaken = !!takeValue == false ? false :  takeValue > skipValue ? true : takeValue === skipValue ? false : false
  
  
    useEffect(() => {
    // alert(windowRef.current?.offsetWidth);
    currentStep == 0 && setIsClosed(false) 
    
  }, [currentStep])


 useEffect(() => {
    if (algoFinished) {
      controlAlgorithm("finished", type)
      return;
    }

    if(status !=="running") return;

    const timer = setTimeout(() => {
      setCurrentSteps(prev => ({...prev, dp: currentStep + 1}));
    }, 100);

    return () => clearTimeout(timer);
  }, [steps, currentStep, status]);


  return (
    <>
    {
      !isClosed &&
      <motion.div
        ref={windowRef}
        drag
        whileDrag={{scale: 1.05, boxShadow: "0px 0px 10px 1px black"}}
        dragConstraints={bounds}
        layout
        whileHover="visible"
        initial="hidden"
        variants={animation}

        animate={algoFinished ? "shake" : "init"}
        exit={{ opacity: 0 }}
        
        className="flex w-fit group/result relative z-40 top-0 group/appear  flex-col h-fit  bg-neutral-700 border-neutral-500 rounded-2xl border py-4 pt-8 px-6 gap-2"
      >
        {status =="paused" && <motion.header animate= {{opacity: [1, 0.5, 0, 0.5, 1]}} transition={{duration: .5, repeat: Infinity, ease: "anticipate"}}  className="text-neutral-200 top-8 right-4 absolute text-2xl">Paused...</motion.header>}
        {status =="finished" && <motion.header animate= {{opacity: [1, 0.5, 0, 0.5, 1]}} transition={{duration: .5, repeat: Infinity, ease: "anticipate"}}  className="text-green-300 top-8 right-4 absolute text-2xl">Finished!</motion.header>}
        {status =="running" && <motion.header animate= {{opacity: [1, 0.5, 0, 0.5, 1]}} transition={{duration: .5, repeat: Infinity, ease: "anticipate"}}  className="text-yellow-200 top-8 right-4 absolute text-2xl">Running...</motion.header>}

        <motion.header variants={handleTextAppear(windowRef)} animate = {algoFinished ? "visible": "hidden"} className="text-white opacity-0 text-2xl">Solved!</motion.header>
        {/* {algoFinished &&  */}
        <motion.div
           transition={{ type: "spring", duration: .3, ease: "easeInOut" }}
          //  animate={{ opacity: !algoFinished ? [1,0] : 1}}

          layout
          className={` z-[-1] h-fit text-white absolute left-full group-hover/appear:opacity-100 opacity-0 transition space-y-4 bg-neutral-700 rounded-tr-2xl rounded-br-2xl border  border-neutral-500  bottom-4 py-6 pl-4  pr-4 flex flex-col`}
        >
          {algoFinished ? 
          <>
          <header className="text-green-300 text-3xl">Result: </header>
          <p className="whitespace-nowrap text-2xl ml-4">dp[{current.i}][{current.w}] = {dp[current.i][current.w]}</p>

          <header className="text-blue-300 mt-4 text-2xl">Time: </header>
          <p className="text-2xl ml-4">{time} ms</p>
          <RunAlgoButton  handleAlgorithms={() => controlAlgorithm("restart", type)} text= "Restart"></RunAlgoButton>
          </>
            :
          <>
          <>
            <header className="text-green-300 text-2xl">Current: </header>
          <p className="ml-4">dp[{current.i}][{current.w}] = {dp[current.i][current.w]}</p>
          </>
          {/* <p>dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p> */}


            {!!takeValue ? 
            <>
            <p>{"max: ("}</p>
          <p className={`ml-4 ${isNewValTaken ? "text-red-400" : "text-green-300"}`}>{"\t"}dp[{current.i-1}][{current.w}] = {skipValue},</p>
          <p className={`ml-4 ${isNewValTaken ? "text-green-300" : "text-red-400"}`}>{"\t"}dp[{current.i-1}][{current.w - weights[current.i-1]}] + {values[current.i-1]} = {takeValue},</p>
          <p>{" )"}</p>
          </>
          :
          <>
            <header className="text-amber-200 mt-4 text-2xl whitespace-nowrap">Value in prev row: </header>

          <p className="ml-4">{"\t"}dp[{current.i-1}][{current.w}] = {skipValue}</p>

          {/* <p className={`${isAddedBigger && "text-green-400"}`}>{"\t"}dp[{step.i-1}][{step.w - weights[step.i-1]}] + {values[step.i-1]} = {takeValue},</p> */}
          {/* <p>{" )"}</p> */}

          </>
          }
          
          {takeValue && <p className="text-2xl whitespace-nowrap">Then: <span className={`${isNewValTaken ? "text-red-400" : "text-green-300"}`}>{skipValue}</span> {skipValue < takeValue ? "<" : skipValue === takeValue ? "=" : ">"} <span className={`${isNewValTaken ? "text-green-300" : "text-red-400"}`}>{takeValue}</span> {"->"} take {isNewValTaken ? takeValue : skipValue} </p> }

          <div className="w-full h-fit mt-4">
          {status =="running"  ?
            <RunAlgoButton  handleAlgorithms={() => controlAlgorithm("paused", type)} text= "Stop"></RunAlgoButton>:
            <RunAlgoButton  handleAlgorithms={() => controlAlgorithm("running", type)} text="Continue"></RunAlgoButton>
          }
          </div>

          </>
        }
        </motion.div>
        <label
          htmlFor="dynamic-table"
          className="text-white text-3xl mb-2 font-semibold"
        >
          Dynamic Programming algorithm table:{" "}
        </label>
        <div className="absolute w-full h-6 top-0 left-0 flex items-center rounded-tl-2xl rounded-tr-2xl bg-neutral-500">
          <button onClick={() => {setIsClosed(true);}} className="rounded-tr-xl absolute right-1 h-4 w-10 flex justify-center items-center  bg-red-500/20 text-red-300 border border-red-500 ">

          <svg className="pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
          </button></div>
        <section
          id="dynamic-table"
          style={{
            gridTemplateRows: `repeat(${weights.length + 2}, 1fr)`,
            gridTemplateColumns: `repeat(${knapsackWeight + 2}, 1fr)`,
          }}
          className="grid text-2xl rounded-2xl text-white gap-1 w-full h-fit relative border-yellow-400"
        >
          {Array.from({ length: weights.length + 2 }).map((_, ri) =>
            Array.from({ length: knapsackWeight + 2 }).map((_, ci) => {
              // top-left corner
              if (ri === 0 && ci === 0) {
                return (
                  <div key="empty" className="border text-center">
                    <span className="text-red-300">n</span>/
                    <span className="text-yellow-200">w</span>
                  </div>
                );
              }

              // top numeration
              if (ri === 0) {
                return (
                  <div
                    key={`top-${ci}`}
                    className="border flex items-center justify-center text-yellow-200"
                  >
                    {ci - 1}
                  </div>
                );
              } 
              // first row (init)
               if (ri === 1 && ci > 0) {
                return (
                  <div
                    key={`top-${ci}`}
                    className="border flex rounded-2xl items-center justify-center text-neutral-600"
                  >
                    {dp[ri-1][ci-1]}
                  </div>
                );
              }

              // left numeration
              if (ci === 0) {
                return (
                  <div
                    key={`left-${ri}`}
                    className="border flex items-center justify-center text-red-300"
                  >
                    {ri - 1}
                  </div>
                );
              }

              // dp cell
              return (
                <motion.div
                  variants={{pulse: {scale: [1.1, 1]}, static: {scale: 1}}}

                  transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut" }}
                  animate = {( status == "finished") && current.i === ri - 1 && current.w === ci - 1 ? "pulse": "static"}
                  key={`${ri}-${ci}`}
                  className={`${(steps[currentStep].i == ri - 1 && steps[currentStep].w == ci - 1) ? "border-yellow-300" : "border-neutral-400"} border text-sm flex items-center aspect-square  rounded-2xl justify-center text-center min-w-10 min-h-10  text-white`}
                >
                  {/* ${isNewValTaken ? "border-green-300" : "border-red-400"} */}
                  <span className={`${(steps[currentStep].i >= ri-1) ? "opacity-100": "opacity-0" } transition `}>
                  {dp[ri - 1][ci - 1]}
                  </span>
                </motion.div>
              );
            })
          )}
        </section>
      </motion.div>
}
    </>
  );
}
export default DynamicProgramming;
