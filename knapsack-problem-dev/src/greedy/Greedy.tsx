import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { delay, motion, scale } from "framer-motion";
import type {
  AlgorithmName,
  TGreedyAlgorithm,
  TAlgorithmStatus,
} from "../types/IAlgorithms";
import {
  animation,
  handleTextAppear,
} from "../helpers/AlgorithmShakeAnimation";
import RunAlgoButton from "../components/RunAlgoButton";

interface IGreedy {
  weights: number[];
  values: number[];
  knapsackWeight: number;

  algorithm: TGreedyAlgorithm;

  currentStep: number;
  setCurrentSteps: Dispatch<SetStateAction<Record<AlgorithmName, number>>>;

  controlAlgorithm: (
    state: TAlgorithmStatus,
    param: "all" | AlgorithmName,
  ) => void;

  type: AlgorithmName;
  status: TAlgorithmStatus;

  bounds: React.RefObject<HTMLElement | null>;
}

function Greedy({
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
}: IGreedy) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const steps = algorithm.steps;
    const current = algorithm.steps[currentStep];

  // useEffect(() => {
  //   alert(r", typ
  //     " LENGTH: " +
  //       steps.length +
  //       " CURRENT INDEX: " +
  //       currentStep +
  //       " CURRENT: " +
  //       JSON.stringify(steps[currentStep]),
  //   );
  // }, [currentStep]);

  useEffect(() => {
    // if (algoFinished) {
    // setCurrentStep(0);
    // pauseAlgorithm()
    // return;
    // }

    if (status !== "running") return;

    const timer = setTimeout(() => {
      setCurrentSteps((prev) => ({ ...prev, greedy: currentStep + 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [steps, currentStep, status]);

  useEffect(() => {
    if (currentStep == steps.length - 1) {
      controlAlgorithm("finished", "greedy");
    }
  }, [currentStep]);



  return (
    <>
      {!isClosed && (
        <motion.div
          ref={windowRef}
          drag
          dragConstraints={bounds}
          layout
        whileDrag={{scale: 1.05, boxShadow: "0px 0px 10px 1px black"}}

          whileHover="visible"
          initial="hidden"
          variants={animation}
          animate={status == "finished" ? "shake" : "init"}
          exit={{ opacity: 0 }}
          className="flex w-fit group/result relative z-40 top-0 group/appear  flex-col h-fit  bg-neutral-700 border-neutral-500 rounded-2xl border py-4 pt-8 px-6 gap-2"
        >

            <motion.header
              className="text-neutral-500 top-8 left-4 absolute"
            >
                It is more correct to use for fractional knapsack
            </motion.header>
          <motion.header variants={handleTextAppear(windowRef)} animate = {status == "finished" ? "visible": "hidden"} className="text-white opacity-0 text-2xl">Solved!</motion.header>
          {/* {algoFinished &&  */}
          {status == "paused" && (
            <motion.header
              animate={{ opacity: [1, 0.5, 0, 0.5, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "anticipate",
              }}
              className="text-neutral-200 top-8 right-4 absolute text-2xl"
            >
              Paused...
            </motion.header>
          )}
          {status == "finished" && (
            <motion.header
              animate={{ opacity: [1, 0.5, 0, 0.5, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "anticipate",
              }}
              className="text-green-300 top-8 right-4 absolute text-2xl"
            >
              Finished!
            </motion.header>
          )}
          {status == "running" && (
            <motion.header
              animate={{ opacity: [1, 0.5, 0, 0.5, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "anticipate",
              }}
              className="text-yellow-200 top-8 right-4 absolute text-2xl"
            >
              Running...
            </motion.header>
          )}
           <motion.div
           transition={{ type: "spring", duration: .3, ease: "easeInOut" }}
          //  animate={{ opacity: !algoFinished ? [1,0] : 1}}

          layout
          className={` z-[-1] h-fit text-white absolute left-full group-hover/appear:opacity-100 opacity-0 transition space-y-4 bg-neutral-700 rounded-tr-2xl rounded-br-2xl border  border-neutral-500  bottom-4 py-6 pl-4  pr-4 flex flex-col`}
        >
          {status === "finished" ? 
          <>
          <header className="text-green-300 text-3xl">Result: </header>
          <p className=" ml-4 text-2xl whitespace-nowrap">total: {algorithm.totalValue}</p>
          <p   className = {`ml-4 text-2xl whitespace-nowrap`}>remain in knapsack: <span className={` ${(knapsackWeight - current.currentWeight) > 0 ? "text-green-300" : "text-red-400"}`}> {(knapsackWeight - current.currentWeight)}</span> </p>


          <header className="text-blue-300 mt-4 text-3xl">Time: </header>
          <p className="text-2xl ml-4">{algorithm.time} ms</p>
          <RunAlgoButton  handleAlgorithms={() => controlAlgorithm("restart", type)} text= "Restart"></RunAlgoButton>
          </>
            :
          <>
            <header className="text-green-300 text-3xl">Current: </header>
          <p className="ml-4 whitespace-nowrap">decision: 
            <span className={` ${current.decision == "fit" ? "text-green-300" :  "text-red-300"}`}> {
            current.decision != "fit" ?"not fit": "fit" }</span> </p>
            <p className="ml-4 whitespace-nowrap">remain in knapsack: {(knapsackWeight - current.currentWeight)}</p>
            <p className="ml-4 whitespace-nowrap">current total: {(current.totalValue)}</p>
          
          
          
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
            htmlFor="greedy-method"
            className="text-white text-3xl mt-2 font-semibold"
          >
            Greedy algorithm:{" "}
          </label>
          {/* <section>{algorithm.steps}</section> */}

          {/* <div className="w-12 aspect-square  border rounded-4xl bg-neutral-600 border-neutral-400"></div>
          <div className="w-12 aspect-square bg-green-300 border rounded-4xl border-green-200"></div>
          <div className="w-12 aspect-square bg-red-300 border rounded-4xl border-red-200"></div>
           */}
          <section
            id="greedy-method"
            className={` text-center flex flex-row items-center w-fit  max-w-[100rem] justify-center rounded-2xl text-white  relative border-yellow-400`}
          >
            <div className={`${windowRef.current?.offsetWidth && (windowRef.current?.offsetWidth / 16) >= 100 && "overflow-x-scroll pb-4"} flex p-4 pt-8 w-fit flex-row`}>


            {steps.map((n, i) => {
                const isLast = i === steps.length-1; 
                const isFirst = i === 0; 

                const decision = n.decision;

                const remain = knapsackWeight - n.currentWeight;
                // const sign = remain > n.weight ? "<" : remain < n.weight ? ">": "==";


                const borderColor = currentStep === i ? "border-yellow-300" :  (decision === "fit" ? "border-green-300" : decision === "not fit" || decision === "partial" &&  "border-red-400");
                const textColor = currentStep === i ? "text-yellow-300" :  (decision === "fit" ? "text-green-300" : (decision === "not fit" || decision === "partial") &&  "text-red-400");

                return (  <motion.div
                    key = {i}

                variants={{
                pulse: {scale: [1.1, 1], 
                     transition:{repeat: Infinity, duration: 1, ease: "easeInOut" }
                }, 
                static: {scale: 1}}}

                animate = {(i === steps.length-1 && status === "finished") ? "pulse": "static"}

               style={{marginTop: isFirst ? undefined:`${(i+1) * 10}px`}}
                    className={` h-30 w-64 flex shrink-0 text-center ${!isLast && "mr-30"} ${currentStep === i ? "border-yellow-300": (currentStep >= i && borderColor) }  relative justify-center bg-neutral-600 items-center group/step hover:scale-110 transition  border mt-2 rounded-2xl `}
                  >
                      <p className= "text-white absolute top-2 right-3 text-2xl transition">Step {i+1}</p>
                {currentStep >= i && 
                <>
                  <motion.p layout transition={{ease:"easeInOut"}} className= {` ${borderColor} ${textColor} absolute -top-8 text-left right-0 rounded-tr-2xl rounded-tl-2xl border-b-0 bg-neutral-600 p-2  border transition`}>W:{n.weight} V:{n.value}</motion.p>

                  <p className= {` ${decision === "fit" ? "text-green-300" :  "text-red-400"} absolute top-3 text-left left-3 transition`}>{decision === "partial" ? "not fit" : n.decision}<br/>{decision === "partial" && <span className="text-yellow-300 absolute left-0 top-4 text-xs"> (partial)</span>}</p>
                  {/* <p className= "text-neutral-400 absolute bottom-3 left-3 transition">Value: {n.totalValue}</p> */}

                {!isFirst ? 
                //   <p className= "text-neutral-400 absolute bottom-3 left-3 transition">current: {n.totalValue}<br/><span className="text-yellow-300">prev: </span>{(steps[i-1].ratio).toFixed(3)} </p>
                  <p className= "text-neutral-400 text-left  absolute bottom-3 left-3 transition"><br/>
                    total:
                        {decision === "fit" ? (<> {n.totalValue - n.value} +<span className={`${textColor}`}> V</span> = 
                            <span/> <span/></>) : " "}
                                        {n.totalValue} <br/>
                            <span>remain: {decision == "fit" ? <>{remain + n.weight} - <span className={`${textColor}`}> W
                                    </span> =  {remain }</> :<span className={`${textColor}`}> {remain + " < W!"}
                                    </span>} 
                                </span>
                      </p>
                  :
                  <>
                  {/* <p className= "text-neutral-400 absolute bottom-3 left-3 transition">initial: {n.totalValue} <br/> <span> remain: {remain}</span></p> */}
                  <p className= "text-neutral-400  text-left absolute bottom-3 left-3 transition">initial: 0 + <span className="text-green-300">V</span> =  {n.totalValue} <br/> <span> remain: {knapsackWeight} - <span className="text-green-300">W</span> = {remain}</span></p>
                    </>
                } 
                </>
                }

                    {!isLast &&
                  <p className= "text-neutral-400 absolute w-30 h-fit left-full  transition "><svg width={120} height={10}>
                      <line x1="0" y1="5" x2="120" y2="5" stroke= {`${currentStep >= i ? n.decision  == "fit" ? "oklch(87.1% 0.15 154.449)" : "oklch(70.4% 0.191 22.216)": "gray"}`} strokeWidth="2" />
                      <line x1="120" y1="5" x2="110" y2="10" stroke= {`${currentStep >= i ? n.decision  == "fit" ? "oklch(87.1% 0.15 154.449)" : "oklch(70.4% 0.191 22.216)": "gray"}`}  strokeWidth="2" />
                      <line x1="120" y1="5" x2="110" y2="0" stroke= {`${currentStep >= i ? n.decision  == "fit" ? "oklch(87.1% 0.15 154.449)" : "oklch(70.4% 0.191 22.216)": "gray"}`} strokeWidth="2" />
                    </svg></p>
                    }
                  </motion.div> )
            })}
            </div>
          </section>

          {/* navbar with close button */}
          <div className="absolute w-full h-6 top-0 left-0 flex items-center rounded-tl-2xl rounded-tr-2xl bg-neutral-500">
            <button
              onClick={() => {
                setIsClosed(true);
              }}
              className="rounded-tr-xl absolute right-1 h-4 w-10 flex justify-center items-center  bg-red-500/20 text-red-300 border border-red-500 "
            >
              <svg
                className="pointer-events-none"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
export default Greedy;