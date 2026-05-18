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
  BruteForceAlgorithm,
  TAlgorithmStatus,
} from "../types/IAlgorithms";
import {
  animation,
  handleTextAppear,
} from "../helpers/AlgorithmShakeAnimation";
import RunAlgoButton from "../components/RunAlgoButton";
import type { IBruteForceStep } from "../types/ISteps";

interface IBruteForce {
  weights: number[];
  values: number[];
  knapsackWeight: number;

  algorithm: BruteForceAlgorithm;

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

function BruteForce({
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
}: IBruteForce) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const steps = algorithm.steps;

  const nodeStyles = "w-12 aspect-square  border rounded-4xl";

  const X_GAP = 100;
  const Y_GAP = 100;
  const NODE_W = 48;

 

  // useEffect(() => {
  //   alert(
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
      setCurrentSteps((prev) => ({ ...prev, bruteforce: currentStep + 1 }));
    }, 700);

    return () => clearTimeout(timer);
  }, [steps, currentStep, status]);

  useEffect(() => {
    if (currentStep == steps.length - 1) {
      controlAlgorithm("finished", "bruteforce");
    }
  }, [currentStep]);


  const maxObj = steps.reduce((max, item) => {
  return item.value > max.value ? item : max;
});

const positionedSteps = steps.map((n) => {
  const nodesInLevel = steps.filter(s => s.level === n.level);

  const index = nodesInLevel.findIndex(s => s.id === n.id);



  // const x =
    // index * X_GAP -
    // (nodesInLevel.length * X_GAP) / 2;
    const x =
  (index - (nodesInLevel.length - 1) / 2) * 120;

  const y = n.level * Y_GAP;

  return {
    ...n,
    x,
    y
  };
});
 const minX = Math.min(...positionedSteps.map(n => n.x));
const maxX = Math.max(...positionedSteps.map(n => n.x));

const treeWidth = maxX - minX + NODE_W;

// const treeHeight = maxX - minX + NODE_W;

const levels = new Set(steps.map(n => n.level));
const treeHeight = levels.size * 100;




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
          <header className="text-green-300 text-2xl">Result: </header>
          <p className="whitespace-nowrap ml-4">max value: {maxObj.value}</p>
          <p className="whitespace-nowrap ml-4">on level: {maxObj.level}</p>
          <p className="whitespace-nowrap ml-4">decision for this max:  
            <span className={`text-2xl ${maxObj.decision == "take" ? "text-green-300" : maxObj.decision === "skip" || maxObj.decision == "root" && "text-red-300"}`}>{maxObj.decision == "root" ? "skip" : maxObj.decision}</span> 
            </p>


          <header className="text-blue-300 mt-4 text-2xl">Time: </header>
          <p className="text-2xl ml-4">{algorithm.time}ms</p>
          </>
            :
          <>
            <header className="text-green-300 text-2xl">Current: </header>
          <p className="ml-4">decision: 
            <span className={` ${steps[currentStep].decision == "take" ? "text-green-300" :  "text-red-300"}`}>{
            steps[currentStep].decision}</span> </p>
            <p className="ml-4">value: {steps[currentStep].value}</p>
          
          
          
          
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
            htmlFor="bruteforce-tree"
            className="text-white text-3xl mb-2 mt-8 font-semibold"
          >
            Brute Force algorithm:{" "}
          </label>
          {/* <section>{algorithm.steps}</section> */}

          {/* <div className="w-12 aspect-square  border rounded-4xl bg-neutral-600 border-neutral-400"></div>
          <div className="w-12 aspect-square bg-green-300 border rounded-4xl border-green-200"></div>
          <div className="w-12 aspect-square bg-red-300 border rounded-4xl border-red-200"></div>
           */}
          <section
            id="bruteforce-tree"
            style={{width: treeWidth+"px", height: treeHeight +"px"}}
            className={` text-center flex flex-col items-center justify-center rounded-2xl text-white max-w-[1200px] w-full ${treeWidth > 1200 && "overflow-x-scroll"}  relative border-yellow-400`}
          >
              <div
  className="absolute w-full h-full  overflow-visible"
  style={{
    left: `calc(${treeWidth > 1200 ? "100%" : "50%"} - 24px)`,
    top: 0
  }}
>

            <svg className="absolute overflow-visible w-full h-full pointer-events-none">
  {positionedSteps.map((node) => {
    if (!node.parentId) return null;

    const parent = positionedSteps.find(

      s => s.id === node.parentId
    );

    if (!parent) return null;

    return (
      <line
        key={node.id}
        x1={parent.x + NODE_W / 2}
        y1={parent.y + NODE_W / 2}
        x2={node.x + NODE_W / 2}
        y2={node.y + NODE_W / 2}
        stroke="gray"
        strokeWidth="2"
      />
    );
  })}
</svg>
{positionedSteps.map((n, i) => {

  const nodeBorder =  currentStep > i && (n.decision == "skip"  ? "border-red-400" : n.decision == "root" ?"border-neutral-400": "border-green-300");
return (<motion.div
  variants={{pulse: {scale: [1.1, 1]}, static: {scale: 1}}}

  key={n.id ?? i}
  animate = {( status == "finished")  ? "pulse": "static"}
  style={{
    position: "absolute",
    left: `${n.x}px`,
    top: `${n.y}px`
  }}
  className={`
  
  ${currentStep ===  i ? "border-yellow-300" :  nodeBorder} w-12 h-12 flex justify-center items-center rounded-4xl border bg-neutral-600  `}
>
  {n.decision === "root" ? "root" : n.value}

  <p className={`absolute -bottom-6 text-xs opacity-60 ${currentStep ===  i ? "text-yellow-300" :  currentStep > i && (n.decision == "skip"  ? "text-red-400" : n.decision == "root" ?"text-neutral-400": "text-green-300")}`}>
    {n.decision}
  </p>
</motion.div>)})}
            </div>

            {/* {steps.map((n, i) => {
              const decision = n.decision;
              const nodesInLevel = steps.filter(s => s.level === n.level);
              const index = nodesInLevel.findIndex(s => s.id === n.id);

              const x =
               index * 120 -
               (nodesInLevel.length * 120) / 2;
              
               const y = n.level * 100;
              
              if (decision === "root") {
                return (
                  <div
                    className={`absolute w-12 flex text-center justify-center items-center group/node h-12  bg-neutral-600 border rounded-4xl border-neutral-400`}
                  >
                    {"root"}
                  <p className= "text-neutral-400 absolute transition -bottom-8 group-hover/node:opacity-100 opacity-0">{n.decision}</p>

                  </div>
                );
              }

              // if (status === "finished") {
              //   return (
              //     <div
              //       className={`border-red-300 w-12 flex justify-center items-center aspect-square ${n.decision == "root" && "bg-neutral-600"} bg-neutral-600 border rounded-4xl border-neutral-400`}
              //     >
              //       {n.value}
              //     </div>
              //   );
              // }

              if (currentStep == i) {
                return (<div style={{top: y+"px", left: `${x}px` }}
                className={` border-green-300 w-12 flex absolute justify-center group/node  items-center h-12  bg-neutral-600 border rounded-4xl `}
                  >
                 {n.value}
                
                  <p className= {`${n.decision == "take" ?"text-green-300" : n.decision === "skip" ? "text-red-300": "text-neutral-400" } absolute  transition -bottom-8 group-hover/node:opacity-100 opacity-0`}>{n.decision}</p>
               
                </div>)

              }


              return (
                <div style={{top: y + "px",  left: `${x}px` }}
                  className={` w-12 flex group/node justify-center absolute items-center h-12 bg-neutral-600 border rounded-4xl border-neutral-400`}
                >
                  {n.value}
                  <p className= {`${n.decision == "take" ?"text-green-300" : n.decision === "skip" ? "text-red-300": "text-neutral-400" } absolute  transition -bottom-8 group-hover/node:opacity-100 opacity-0`}>{n.decision}</p>
                </div>
              );
            })} */}
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
export default BruteForce;

// <motion.div
//    transition={{ type: "spring", duration: .3, ease: "easeInOut" }}
//   //  animate={{ opacity: !algoFinished ? [1,0] : 1}}

//   layout
//   className={` z-[-1] h-fit text-white absolute left-full group-hover/appear:opacity-100 opacity-0 transition space-y-4 bg-neutral-700 rounded-tr-2xl rounded-br-2xl border  border-neutral-500  bottom-4 py-6 pl-4  pr-4 flex flex-col`}
// >
//   {algoFinished ?
//   <>
//   <header className="text-green-300 text-2xl">Result: </header>
//   <><p className="whitespace-nowrap ml-4">dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p><header className="text-blue-300 mt-4 text-2xl">Time: </header><p className="text-2xl ml-4">{time}ms</p></>
//   </>
//     :
//   <>
//   <>
//     <header className="text-green-300 text-2xl">Current: </header>
//   <p className="ml-4">dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p>
//   </>
//   {/* <p>dp[{step.i}][{step.w}] = {dp[step.i][step.w]}</p> */}

//     {!!takeValue ?
//     <>
//     <p>{"max: ("}</p>
//   <p className={`ml-4 ${isNewValTaken ? "text-red-400" : "text-green-300"}`}>{"\t"}dp[{step.i-1}][{step.w}] = {skipValue},</p>
//   <p className={`ml-4 ${isNewValTaken ? "text-green-300" : "text-red-400"}`}>{"\t"}dp[{step.i-1}][{step.w - weights[step.i-1]}] + {values[step.i-1]} = {takeValue},</p>
//   <p>{" )"}</p>
//   </>
//   :
//   <>
//     <header className="text-amber-200 mt-4 text-2xl whitespace-nowrap">Value in prev row: </header>

//   <p className="ml-4">{"\t"}dp[{step.i-1}][{step.w}] = {skipValue}</p>

//   {/* <p className={`${isAddedBigger && "text-green-400"}`}>{"\t"}dp[{step.i-1}][{step.w - weights[step.i-1]}] + {values[step.i-1]} = {takeValue},</p> */}
//   {/* <p>{" )"}</p> */}

//   </>
//   }

//   {takeValue && <p className="text-2xl whitespace-nowrap">Then: <span className={`${isNewValTaken ? "text-red-400" : "text-green-300"}`}>{skipValue}</span> {skipValue < takeValue ? "<" : skipValue === takeValue ? "=" : ">"} <span className={`${isNewValTaken ? "text-green-300" : "text-red-400"}`}>{takeValue}</span> {"->"} take {isNewValTaken ? takeValue : skipValue} </p> }

//   <div className="w-full h-fit mt-4">
//   {isAlgoRunning  ?
//     <RunAlgoButton  handlePauseAlgorithms={() => pauseAlgorithm()} text= "Stop"></RunAlgoButton>:
//     <RunAlgoButton  handlePauseAlgorithms={() => continueAlgorithm()} text="Continue"></RunAlgoButton>
//   }
//   </div>

//   </>
// }
// </motion.div>
