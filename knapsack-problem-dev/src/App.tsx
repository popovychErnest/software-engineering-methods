import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import DynamicProgramming from "./dynamic-programming/DynamicProgramming";
import { AnimatePresence } from "framer-motion";
import { useAlgorithms } from "./hooks/useAlgorithms";
import type { IStep } from "./types/IStep";
import type { AlgorithmTypes } from "./types/IAlgorithms";

import {motion} from "framer-motion";

function App() {
  const boundsRef = useRef<HTMLElement>(null);
  const { activeAlgorithms, setActiveAlgorithms } = useAlgorithms();


  const [weights, setWeights] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [knapsackWeight, setKnapsackWeight] = useState<number>(0);

  const [steps, setSteps] = useState<IStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const pauseAlgorithms = (param: "all" | AlgorithmTypes ): void => {
    switch (param) {
      case "all": stopAlgorithms(); return;
      case "dp": setActiveAlgorithms(prev => ({...prev, dp: false}));  return;
    }
  }

  const stopAlgorithms = () => {
    setActiveAlgorithms((prev) => {
      const updated = { ...prev };
      (Object.keys(updated) as AlgorithmTypes[]).forEach((key) => {
        updated[key] = false;
      });
      return updated;
    });
  };

  const visitedDp =
    steps[currentStep]?.dpCurrState ??
    Array.from({ length: 3 }, () => Array(3).fill(0));

  useEffect(() => {
    if (currentStep === steps?.length - 1) {
      // setCurrentStep(0);
      stopAlgorithms();
      return;
    }
    // if all algorithms stopped
    if (Object.values(activeAlgorithms).every((el) => el == false)) return;

    if (!weights.length && !values.length) return;

    const timer = setTimeout(() => {
      console.log(steps);
      setCurrentStep((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [steps, currentStep]);

  useEffect(() => {
    // alert(JSON.stringify(activeAlgorithms));
    // alert(JSON.stringify(steps));
  }, [activeAlgorithms, steps]);

  

  return (
    <>
      <AnimatePresence mode="wait">
        <main  className=" w-screen  bg-neutral-800 box-border py-10 h-screen space-y-10  flex flex-col justify-center ">
            <Input
              isAlgoRunning={Object.values(activeAlgorithms).some(el => el === true)}
              setWeights={setWeights}
              setValues={setValues}
              setKnapsackWeight={setKnapsackWeight}
              setSteps={setSteps}
              currentStep={currentStep}
              pauseAlgorithms={pauseAlgorithms}
              handleResetStep={() => setCurrentStep(0)}
    
              />
          {/* <motion.section className="border-red-500  flex justify-center relative rounded-2xl px-10 mx-10 w-max-full h-full"> */}
        <motion.section ref= {boundsRef} className="w-[calc(100%-1rem)] z-1 absolute p-4 border border-red-500 left-4 top-4 h-[calc(100%-1rem)] "></motion.section>
            {weights.length && values.length && knapsackWeight !== 0 ? (
              
              <DynamicProgramming
              values={values}
              pauseAlgorithms={pauseAlgorithms}
              bounds = {boundsRef}
              weights={weights}
              knapsackWeight={knapsackWeight}
              dp={visitedDp}
              currentStep={currentStep} 
              steps={steps}
              algoFinished = {steps.length-1 === currentStep}
                />
            ) : (
              <h1 className="text-white text-4xl">Still empty...</h1>
            )}
          {/* </motion.section> */}
        </main>
      </AnimatePresence>
    </>
  );
}

export default App;
