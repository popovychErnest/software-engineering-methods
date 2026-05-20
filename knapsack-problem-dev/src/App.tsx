import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import DynamicProgramming from "./dynamic-programming/DynamicProgramming";
import { AnimatePresence } from "framer-motion";
import { useAlgorithms } from "./hooks/useAlgorithms";
import type { AlgorithmName, TAlgorithmStatus } from "./types/IAlgorithms";

import { motion } from "framer-motion";
import BruteForce from "./brute-force/BruteForce";
import Greedy from "./greedy/Greedy";
import BranchBounds from "./branch/BranchBounds";

function App() {
  const boundsRef = useRef<HTMLElement>(null);
  const { algorithms, setAlgorithms } = useAlgorithms();
  const [currentSteps, setCurrentSteps] = useState<
    Record<AlgorithmName, number>
  >({ dp: 0, bruteforce: 0, greedy: 0, branch_bounds: 0 });

  // INPLEMENT USESTATE STATUS, SETSTATUS!!! (refactor, mb replace activeAlgorithms)
  const [status, setStatus] = useState<Record<AlgorithmName, TAlgorithmStatus>>(
    { dp: "unavailable", bruteforce: "unavailable", greedy: "unavailable",branch_bounds:"unavailable" },
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
            // isNoOneIsRunning = {Object.values(activeAlgorithms).every(el => el === false)}
            setWeights={setWeights}
            setValues={setValues}
            setKnapsackWeight={setKnapsackWeight}
            setCurrentSteps={setCurrentSteps}
            controlAlgorithms={controlAlgorithms}
            bounds={boundsRef}
          />
          {/* <motion.section className="border-red-500  flex justify-center relative rounded-2xl px-10 mx-10 w-max-full h-full"> */}
          <motion.section
            ref={boundsRef}
            className="w-[calc(100%-2rem)] z-1 absolute rounded-2xl p-4 border border-neutral-500 left-4 top-4 h-[calc(100%-2rem)] "
          ></motion.section>
          {/* {Object.keys(activeAlgorithms).map(k => { */}
          {/* activeAlgorithms[k] &&  */}
          {/* })} */}

          {status.dp !== "unavailable" && (
            <DynamicProgramming
              type={"dp"}
              values={values}
              weights={weights}
              knapsackWeight={knapsackWeight}
              status={status.dp}
              currentStep={currentSteps.dp}
              algorithm={algorithms.dp}
              setCurrentSteps={setCurrentSteps}
              controlAlgorithm={controlAlgorithms}
              bounds={boundsRef}
            />
          )}

          {status.bruteforce !== "unavailable" && (
            <BruteForce
              type={"bruteforce"}
              values={values}
              weights={weights}
              knapsackWeight={knapsackWeight}
              status={status.bruteforce}
              currentStep={currentSteps.bruteforce}
              algorithm={algorithms.bruteforce}
              setCurrentSteps={setCurrentSteps}
              controlAlgorithm={controlAlgorithms}
              bounds={boundsRef}
            />
          )}

          {status.greedy !== "unavailable" && (
            <Greedy
              type={"greedy"}
              values={values}
              weights={weights}
              knapsackWeight={knapsackWeight}
              status={status.greedy}
              currentStep={currentSteps.greedy}
              algorithm={algorithms.greedy}
              setCurrentSteps={setCurrentSteps}
              controlAlgorithm={controlAlgorithms}
              bounds={boundsRef}
            />
          )}
           {status.branch_bounds !== "unavailable" && (
            <BranchBounds
              type={"branch_bounds"}
              values={values}
              weights={weights}
              knapsackWeight={knapsackWeight}
              status={status.branch_bounds}
              currentStep={currentSteps.branch_bounds}
              algorithm={algorithms.branch_bounds}
              setCurrentSteps={setCurrentSteps}
              controlAlgorithm={controlAlgorithms}
              bounds={boundsRef}
            />
          )}
        </main>
      </AnimatePresence>
    </>
  );
}

export default App;
