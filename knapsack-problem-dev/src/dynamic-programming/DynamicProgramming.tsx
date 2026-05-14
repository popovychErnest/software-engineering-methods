import { useEffect, useRef, useState } from "react";
import type { IStep } from "../types/IStep";
import { delay, motion, scale } from "framer-motion";
import StopALgoButton from "../components/StopAlgoButton";
import type { AlgorithmTypes } from "../types/IAlgorithms";

interface IDynamicProgramming {
  weights: number[];
  values: number[];

  knapsackWeight: number;
  dp: number[][];
  currentStep: number;
  steps: IStep[];
  bounds: React.RefObject<HTMLElement | null>;
  algoFinished: boolean,
  pauseAlgorithms: (val: "all" | AlgorithmTypes) => void;
}

function DynamicProgramming({
  weights,
  values,

  knapsackWeight,
  dp,
  currentStep,
  steps,
  bounds,
  algoFinished,
  pauseAlgorithms
}: IDynamicProgramming) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const step = steps[currentStep];
  
  // if less than next - skip
  const skipValue = dp[step.i-1][step.w];

  const takeValue = step.w >= weights[step.i - 1]
    ? (dp[step.i - 1]?.[step.w - weights[step.i - 1]] ?? 0) + values[step.i - 1]
    : null;

    const isAddedBigger = !!takeValue == false ? false :  takeValue > skipValue ? true : takeValue === skipValue ? false : false
  useEffect(() => {
    // alert(windowRef.current?.offsetWidth);
    currentStep == 0 && setIsClosed(false) 
  }, [currentStep])


  // useEffect(() => {
  //   if (currentStep == steps.length -1) {
  //     setAlgoFinished(true);
  //   }
  //   else {
  //     setAlgoFinished(false);
  //   }
  // }, [currentStep])

  const animation = {
  init: {
    rotate: 0,
    x: 0,
  },

  shake: {
    rotate: [-5, 5, -2, 2, 0],

    transition: {
      duration: 0.4,
    },
  },
};

  const text_appear = {
  hidden: {
    opacity: 0,
    y: 0,
    x: windowRef.current?.offsetWidth,
  },

  visible: {
    x: windowRef.current?.offsetWidth,
    y: -100,
    opacity: [1,0],
    transition: {
      duration: .6,
    },
  },
};

  return (
    <>
    {
      !isClosed &&
      <motion.div
        ref={windowRef}
        drag
        dragConstraints={bounds}
        layout
        whileHover="visible"
        initial="hidden"
        variants={animation}

        animate={algoFinished ? "shake" : "init"}
        exit={{ opacity: 0 }}
        
        className="flex w-fit group/result relative z-40 top-0   flex-col h-fit  bg-neutral-700 border-neutral-500 rounded-2xl border py-4 pt-8 px-6 gap-2"
      >
        <motion.header variants={text_appear} animate = {algoFinished ? "visible": "hidden"} className="text-white opacity-0 text-2xl">Solved!</motion.header>
        {/* {algoFinished &&  */}
        <motion.div
           transition={{ type: "spring", duration: .1, ease: "easeInOut" }}
          variants={{
            hidden: {
              x: !windowRef.current?.offsetWidth
                ? 100
                :(windowRef.current.offsetWidth - 25),
                // algoFinished ? (windowRef.current.offsetWidth - 25) 

              opacity: 0
            },
            visible: { x: !windowRef.current?.offsetWidth
                ? 100
                : windowRef.current.offsetWidth - 25,
              opacity: 1
              },
          }}
          className={` z-[-1] h-fit text-white absolute transition gap-4 bg-neutral-700 rounded-tr-2xl rounded-br-2xl border  border-neutral-500 bottom-4 py-6 pl-8 pr-4 flex flex-col`}
        >
          {algoFinished ? 
          <>
          <header className="text-green-300 text-2xl">Result: </header>
          <p>dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p>
          </>
            :
          <>
          <>
          <StopALgoButton handlePauseAlgorithms={() => pauseAlgorithms("dp")}></StopALgoButton>
            <header className="text-green-300 text-2xl">Current: </header>
          <p>dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p>
          </>
          {/* <p>dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p> */}


            {!!takeValue ? 
            <>
            <p>{"max: ("}</p>
          <p className={`${isAddedBigger ? "text-red-400" : "text-green-300"}`}>{"\t"}dp[{step.i-1}][{step.w}] = {skipValue},</p>
          <p className={`${isAddedBigger ? "text-green-300" : "text-red-400"}`}>{"\t"}dp[{step.i-1}][{step.w - weights[step.i-1]}] + {values[step.i-1]} = {takeValue},</p>
          <p>{" )"}</p>
          </>
          :
          <>
            <header className="text-amber-200 text-2xl">Value in prev row: </header>

          <p>{"\t"}dp[{step.i-1}][{step.w}] = {skipValue},</p>
          {/* <p className={`${isAddedBigger && "text-green-400"}`}>{"\t"}dp[{step.i-1}][{step.w - weights[step.i-1]}] + {values[step.i-1]} = {takeValue},</p> */}
          {/* <p>{" )"}</p> */}
          </>
          }
          
          {takeValue && <p className="text-2xl">Then: <span className={`${isAddedBigger ? "text-red-400" : "text-green-400"}`}>{skipValue}</span> {skipValue < takeValue ? "<" : skipValue === takeValue ? "=" : ">"} <span className={`${isAddedBigger ? "text-green-400" : "text-red-400"}`}>{takeValue}</span> {"->"} take {isAddedBigger ? takeValue : skipValue} </p> }
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
          <button onClick={() => {setIsClosed(true); alert("yep!")}} className="rounded-tr-xl absolute right-1 h-4 w-10 flex justify-center items-center  bg-red-500/20 text-red-300 border border-red-500 ">

          <svg className="pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
          </button></div>
        {/* <div>{dp.map((_,i) => <p>{i}</p>) }</div> */}
        <section
          id="dynamic-table"
          style={{
            gridTemplateRows: `repeat(${weights.length + 2}, 1fr)`,
            gridTemplateColumns: `repeat(${knapsackWeight + 2}, 1fr)`,
          }}
          className="grid text-2xl rounded-2xl text-white w-full h-fit relative border-yellow-400"
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
                    className="border flex items-center justify-center text-neutral-600"
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
                  ease: "anticipate" }}
                  animate = {algoFinished && step.i === ri - 1 && step.w === ci - 1 ? "pulse": "static"}
                  key={`${ri}-${ci}`}
                  className={`${steps[currentStep].i == ri - 1 && steps[currentStep].w == ci - 1 ? "border-green-300 border-6" : ""}  border flex items-center justify-center min-w-10 min-h-10  text-white`}
                >
                  {dp[ri - 1][ci - 1]}
                </motion.div>
              );
            }),
          )}
        </section>

      </motion.div>
}
    </>
  );
}
export default DynamicProgramming;
