import { useEffect, useRef } from "react";
import { algorithmComponents } from "../config/algoComponents.config";
import { type AlgorithmName } from "../config/algoComponents.config";
import type { IAlgorithmComponentProps } from "../types/IAlgorithmComponent";
import { motion } from "framer-motion";

import { animation } from "./AlgorithmShakeAnimation";
function RenderAlgorithm<K extends AlgorithmName>(
  props: IAlgorithmComponentProps<K>,
) {
  const Componentic = algorithmComponents[props.type]
    .component as React.ComponentType<IAlgorithmComponentProps<K>>;
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.status !== "running") return;
    const timer = setTimeout(() => {
      props.setCurrentSteps((prev) => ({
        ...prev,
        [props.type]: props.currentStep + 1,
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [props.algorithm.steps, props.currentStep, props.status]);
  useEffect(() => {
    if (props.currentStep == props.algorithm.steps.length - 1) {
      props.controlAlgorithm("finished", props.type);
    }
  }, [props.currentStep]);

  return (
    <motion.div
      ref={windowRef}
      drag
      whileDrag={{ scale: 1.05, boxShadow: "0px 0px 10px 1px black" }}
      dragConstraints={props.bounds}
      layout
      whileHover="visible"
      initial="hidden"
      variants={animation}
      animate={props.status == "finished" ? "shake" : "init"}
      exit={{ opacity: 0 }}
      className="flex w-fit group/result relative z-40 top-0 group/appear  flex-col h-fit  bg-neutral-700 border-neutral-500 rounded-2xl border py-4 pt-8 px-6 gap-2"
    >
        {props.status =="paused" && <motion.header animate= {{opacity: [1, 0.5, 0, 0.5, 1]}} transition={{duration: .5, repeat: Infinity, ease: "anticipate"}}  className="text-neutral-200 top-8 right-4 absolute text-2xl">Paused...</motion.header>}
        {props.status =="finished" && <motion.header animate= {{opacity: [1, 0.5, 0, 0.5, 1]}} transition={{duration: .5, repeat: Infinity, ease: "anticipate"}}  className="text-green-300 top-8 right-4 absolute text-2xl">Finished!</motion.header>}
        {props.status =="running" && <motion.header animate= {{opacity: [1, 0.5, 0, 0.5, 1]}} transition={{duration: .5, repeat: Infinity, ease: "anticipate"}}  className="text-yellow-200 top-8 right-4 absolute text-2xl">Running...</motion.header>}
      <Componentic {...props} />


      {/* navbar with close button */}
          <div className="absolute w-full h-6 top-0 left-0 flex items-center rounded-tl-2xl rounded-tr-2xl bg-neutral-500">
            <button
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
  );
}
export default RenderAlgorithm;
