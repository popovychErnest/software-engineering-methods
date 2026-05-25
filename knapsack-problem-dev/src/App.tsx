import { useRef, useState } from "react";
import { Input } from "./Input";
import { AnimatePresence } from "framer-motion";
import { useAlgorithms } from "./hooks/useAlgorithms";
import type { TAlgorithmStatus } from "./types/IAlgorithms";
import {type AlgorithmName } from "./config/algoComponents.config";
import { motion } from "framer-motion";
import RenderAlgorithm from "./helpers/renderAlgorithm";

function App() {
  const boundsRef = useRef<HTMLElement>(null);
  const { algorithms, setAlgorithms } = useAlgorithms();
  const [currentSteps, setCurrentSteps] = useState<
    Record<AlgorithmName, number>>({ dp: 0, bruteforce: 0, greedy: 0, branch_bounds: 0 });

  // INPLEMENT USESTATE STATUS FOR ALGOS
  const [status, setStatus] = useState<Record<AlgorithmName, TAlgorithmStatus>>(
    {
      dp: "unavailable",
      bruteforce: "unavailable",
      greedy: "unavailable",
      branch_bounds: "unavailable",
    },
  );

  const [weights, setWeights] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [knapsackWeight, setKnapsackWeight] = useState<number>(0);


  const controlAlgorithms = (
    status: TAlgorithmStatus,
    param: "all" | AlgorithmName = "all",
  ): void => {
    if (status === "restart") {
      setStatus((prev) => ({ ...prev, [param]: "running" }));
      setCurrentSteps((prev) => ({ ...prev, [param]: 0 }));
      return;
    }
    if (param === "all") {
      runAlgorithms(status);
      return;
    }
    setStatus((prev) => ({ ...prev, [param]: status }));
    return;
  };

  const runAlgorithms = (status: TAlgorithmStatus) => {
    setStatus((prev) => {
      const updated = { ...prev };
      (Object.keys(updated) as AlgorithmName[]).forEach((k) => {
        updated[k] = status;
      });
      return updated;
    });
  };
  // useEffect(() => {alert("CURRENT STATUSES: "+JSON.stringify(status))}, [status])
  return (
    <>
      <AnimatePresence mode="wait">
        <main className=" w-screen  bg-neutral-800 box-border py-10 h-screen space-y-10  flex flex-col justify-center ">
          <Input
            isAlgosRunning={(Object.values(status) as TAlgorithmStatus[]).some(
              (el) => el === "running",
            )}
            isAlgosPaused={(Object.values(status) as TAlgorithmStatus[]).some(
              (el) => el === "paused",
            )}
            statuses={status}
            setWeights={setWeights}
            setValues={setValues}
            setKnapsackWeight={setKnapsackWeight}
            setCurrentSteps={setCurrentSteps}
            controlAlgorithms={controlAlgorithms}
            bounds={boundsRef}
          />
          <motion.section
            ref={boundsRef}
            className="w-[calc(100%-2rem)] z-1 absolute rounded-2xl p-4 border border-neutral-500 left-4 top-4 h-[calc(100%-2rem)] "
          >
            {(Object.keys(status) as AlgorithmName[])
              .filter((type) => status[type] !== "unavailable")
              .map((type) => {

                // algo compo props 
                const props = {
                  type,
                  algorithm: algorithms[type],
                  weights,
                  values,
                  knapsackWeight,
                  currentStep: currentSteps[type],
                  setCurrentSteps,
                  controlAlgorithm: controlAlgorithms,
                  status: status[type],
                  bounds:boundsRef,
                }

                // RENDER
                return <RenderAlgorithm key = {type} {...props}/>;
              })}
            ;
          </motion.section>
        </main>
      </AnimatePresence>
    </>
  );
}

export default App;
