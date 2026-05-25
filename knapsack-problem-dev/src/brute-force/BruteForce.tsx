import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { handleTextAppear } from "../helpers/AlgorithmShakeAnimation";
import RunAlgoButton from "../components/RunAlgoButton";
import type { IAlgorithmComponentProps } from "../types/IAlgorithmComponent";

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
}: IAlgorithmComponentProps<"bruteforce">) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const steps = algorithm.steps;

  const Y_GAP = 100;
  const NODE_W = 48;

  const maxObj = steps.reduce((max, item) => {
    return item.value > max.value ? item : max;
  });

  const positionedSteps = steps.map((n) => {
    const nodesInLevel = steps.filter((s) => s.level === n.level);

    const index = nodesInLevel.findIndex((s) => s.id === n.id);
    const x = (index - (nodesInLevel.length - 1) / 2) * 100;

    const y = n.level * Y_GAP;

    return {
      ...n,
      x,
      y,
    };
  });
  const minX = Math.min(...positionedSteps.map((n) => n.x));
  const maxX = Math.max(...positionedSteps.map((n) => n.x));

  const treeWidth = maxX - minX + NODE_W;

  // const treeHeight = maxX - minX + NODE_W;

  const levels = new Set(steps.map((n) => n.level));
  const treeHeight = levels.size * 100;

  return (
    <>
      <motion.header
        variants={handleTextAppear(windowRef)}
        animate={status == "finished" ? "visible" : "hidden"}
        className="text-white opacity-0 text-2xl"
      >
        Solved!
      </motion.header>

      <motion.div
        transition={{ type: "spring", duration: 0.3, ease: "easeInOut" }}
        layout
        className={` z-[-1] h-fit text-white absolute left-full group-hover/appear:opacity-100 opacity-0 transition space-y-4 bg-neutral-700 rounded-tr-2xl rounded-br-2xl border  border-neutral-500  bottom-4 py-6 pl-4  pr-4 flex flex-col`}
      >
        {status === "finished" ? (
          <>
            <header className="text-green-300 text-3xl">Result: </header>
            <p className="whitespace-nowrap text-2xl ml-4">
              max value: {maxObj.value}
            </p>
            <p className="whitespace-nowrap text-2xl ml-4">
              appearance at level: {maxObj.level}
            </p>
            <p className="whitespace-nowrap text-2xl ml-4">
              quantity of nodes:{" "}
              <span className="text-red-400">{steps.length - 1}</span>
            </p>

            <header className="text-blue-300 mt-4 text-3xl">Time: </header>
            <p className="text-2xl ml-4">{algorithm.time} ms</p>
            <RunAlgoButton
              handleAlgorithms={() => controlAlgorithm("restart", type)}
              text="Restart"
            ></RunAlgoButton>
          </>
        ) : (
          <>
            <header className="text-green-300 text-2xl">Current: </header>
            <p className="ml-4">
              decision:
              <span
                className={` ${steps[currentStep].decision == "take" ? "text-green-300" : "text-red-300"}`}
              >
                {steps[currentStep].decision}
              </span>{" "}
            </p>
            <p className="ml-4">value: {steps[currentStep].value}</p>
            <p className="ml-4">level: {steps[currentStep].level}</p>

            <div className="w-full h-fit mt-4">
              {status == "running" ? (
                <RunAlgoButton
                  handleAlgorithms={() => controlAlgorithm("paused", type)}
                  text="Stop"
                ></RunAlgoButton>
              ) : (
                <RunAlgoButton
                  handleAlgorithms={() => controlAlgorithm("running", type)}
                  text="Continue"
                ></RunAlgoButton>
              )}
            </div>
          </>
        )}
      </motion.div>

      <label
        htmlFor="bruteforce-tree"
        className="text-white text-3xl mb-2 mt-2 font-semibold"
      >
        Brute Force algorithm:{" "}
      </label>
      <section
        id="bruteforce-tree"
        style={{ width: treeWidth + "px", height: treeHeight + "px" }}
        className={` text-center flex flex-col items-center justify-center rounded-2xl text-white max-w-[1200px] w-full ${treeWidth > 1200 && "overflow-x-scroll"}  relative border-yellow-400`}
      >
        <div
          className="absolute w-full h-full  overflow-visible"
          style={{
            left: `calc(${treeWidth > 1200 ? "100%" : "50%"} - 24px)`,
            top: 0,
          }}
        >
          <svg className="absolute overflow-visible w-full h-full pointer-events-none">
            {positionedSteps.map((node) => {
              if (!node.parentId) return null;

              const parent = positionedSteps.find(
                (s) => s.id === node.parentId,
              );

              if (!parent) return null;

              return (
                <line
                  key={node.id}
                  x1={parent.x + NODE_W / 2}
                  y1={parent.y + NODE_W / 2}
                  x2={node.x + NODE_W / 2}
                  y2={node.y + NODE_W / 2}
                  stroke={`gray`}
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          {positionedSteps.map((n, i) => {
            const nodeBorder =
              currentStep > i &&
              (n.decision == "skip"
                ? "border-red-400"
                : n.decision == "root"
                  ? "border-neutral-400"
                  : "border-green-300");
            return (
              <motion.div
                variants={{ pulse: { scale: [1.1, 1] }, static: { scale: 1 } }}
                key={n.id ?? i}
                animate={status == "finished" ? "pulse" : "static"}
                style={{
                  position: "absolute",
                  left: `${n.x}px`,
                  top: `${n.y}px`,
                }}
                className={`
  
  ${currentStep === i ? "border-yellow-300" : nodeBorder} w-12 h-12 flex group/node justify-center items-center rounded-4xl border bg-neutral-600  `}
              >
                {currentStep >= i && (
                  <>
                    {n.decision === "root" ? "root" : n.value}

                    {n.decision != "root" && (
                      <p
                        className={`absolute opacity-0 group-hover/node:opacity-100 group-hover/node:scale-120 scale-50 transition -right-12  text-xs `}
                      >
                        V: {values[n.i]}
                        <br />
                        W: {weights[n.i]}
                      </p>
                    )}

                    <p
                      className={`absolute -bottom-6 text-sm opacity-60 ${currentStep === i ? "text-yellow-300" : currentStep > i && (n.decision == "skip" ? "text-red-400" : n.decision == "root" ? "text-neutral-400" : "text-green-300")}`}
                    >
                      {n.decision}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default BruteForce;
