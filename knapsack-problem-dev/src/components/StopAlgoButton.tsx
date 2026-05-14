import { useAlgorithms } from "../hooks/useAlgorithms";
import type { AlgorithmTypes } from "../types/IAlgorithms";

interface IStopButton {
  handlePauseAlgorithms: () => void;
  setIsOpened?: (val: boolean) => void;
}

function StopALgoButton({ handlePauseAlgorithms, setIsOpened }: IStopButton) {
  const { activeAlgorithms, setActiveAlgorithms } = useAlgorithms();

  return (
    <>
      {Object.values(activeAlgorithms).some((el) => el == true) && (
        <button
          onClick={() => {
            handlePauseAlgorithms();

            typeof setIsOpened == "function" && setIsOpened(true);
          }}
          className={` rounded-xl bg-red-500/20  p-3`}
        >
          <p className={`text-red-300 space-y-1 `}> Stop</p>
        </button>
      )}
    </>
  );
}

export default StopALgoButton;
