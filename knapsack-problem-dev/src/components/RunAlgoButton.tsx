import { motion } from "framer-motion";

interface IStopButton {
  handleAlgorithms: () => void;
  setIsOpened?: () => void;
  text: string
}

function RunAlgoButton({ handleAlgorithms, setIsOpened, text="Stop" }: IStopButton) {

  return (
    <>
        <motion.button  
        animate ={text != "Stop" ? {rotate: [4, -4, 2,-2,  1, -1, 0]} : undefined}
        transition={{duration: 1, repeat: Infinity, ease: "easeIn"}}

          onClick={() => {
            handleAlgorithms();
            typeof setIsOpened == "function" && setIsOpened();
          }}
          className={` rounded-xl ${text === "Stop" ? "bg-red-500/20 border-red-300 text-red-300" : text == "Continue"?  "bg-blue-300/20 border-blue-300 text-blue-300" : (text == "Restart" &&  "bg-yellow-300/20 border-yellow-300 text-yellow-300") } border w-full  p-3`}
        >
          <p className={` space-y-1 `}> {text}</p>
        </motion.button>
    </>
  );
}

export default RunAlgoButton;
