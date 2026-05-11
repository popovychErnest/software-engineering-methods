import { useEffect, useState } from 'react'
import { Input } from './Input'
import DynamicProgramming from './DynamicProgramming'
import {AnimatePresence} from "framer-motion";
function App() {

  const [weights, setWeights] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [knapsackWeight, setKnapsackWeight] = useState<number>(0);
  const [dp, setDp] = useState<number[][]>(Array.from({length: 3}, ()=>  Array(3).fill(0)));

  return (
    <>
    <AnimatePresence mode = "wait">

      <main className='border-red-500 w-screen bg-neutral-800 box-border py-10 h-screen space-y-10  flex flex-col justify-center '> 
      <section className='rounded-2xl w-full flex justify-center h-fit'>
    <Input setWeights={setWeights} setValues = {setValues} setKnapsackWeight={setKnapsackWeight} setDp = {setDp}/>
      </section>
 
      <section  className='border-red-500 overflow-y-scroll flex justify-center  bg-neutral-700 rounded-2xl px-10 mx-10 w-max-full h-full'>
    {weights.length && values.length && knapsackWeight !== 0  ?
    <DynamicProgramming weights = {weights} values = {values} knapsackWeight = {knapsackWeight} dp = {dp} setDp = {setDp}/> : <h1 className='text-white text-4xl'>
      Still empty...
    </h1>
    }
      </section>
      </main> 
    </AnimatePresence>
    </>
  )
}

export default App