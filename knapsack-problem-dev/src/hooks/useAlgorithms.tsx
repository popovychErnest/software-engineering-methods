import { useContext } from "react";
import { AlgorithmsContext } from "./AlgorithmProvider";

export function useAlgorithms() {
  const ctx = useContext(AlgorithmsContext);

  if (!ctx) {
    throw new Error("useAlgorithms must be used within AlgorithmsProvider");
  }
  return ctx;
}
