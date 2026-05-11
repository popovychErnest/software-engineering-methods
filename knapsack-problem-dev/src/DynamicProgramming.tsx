import { useState, type Dispatch, type SetStateAction } from "react";
import {motion} from "framer-motion";
interface IDynamicProgramming  {
    weights: number[];
    values: number[];
    knapsackWeight: number,
    dp: number[][],
    setDp: Dispatch<SetStateAction<number[][]>>
}

 
function DynamicProgramming({weights, values, knapsackWeight, dp, setDp}: IDynamicProgramming) {

  return (
    <>
   <motion.div initial = {{opacity: 0, y:   -20}} animate = {{opacity: 1,  y: 0}} exit={{opacity: 0}} className = "w-[70%] h-[30rem] border-blue-500 py-4">

      <label htmlFor="dynamic-table" className="text-white text-3xl font-semibold">Dynamic Programming algorithm table: </label>
      {/* <div>{dp.map((_,i) => <p>{i}</p>) }</div> */}
      <section id = "dynamic-table" style={{gridTemplateRows: `repeat(${weights.length + 1}, 1fr)`,gridTemplateColumns: `repeat(${knapsackWeight + 1}, 1fr)`}} className="grid w-full h-fit relative border-yellow-400">
      {dp.map((row, i) =>  
        row.map(cell => {
          return <div className="border-white flex aspect-square justify-center items-center border">
            {cell} 
          </div>
        })
      )}
      </section>
    </motion.div>
    </>
  )
}

export default DynamicProgramming;


// function knapsack(weights, values, W) {
//   const n = weights.length;
//   const dp = Array.from({ length: n + 1 }, () =>
//     Array(W + 1).fill(0)
//   );
//   for (let i = 1; i <= n; i++) {
//     for (let w = 0; w <= W; w++) {
//       const weight = weights[i - 1];
//       const value = values[i - 1];
//       if (weight <= w) {
//         dp[i][w] = Math.max(
//           dp[i - 1][w],                  
//           dp[i - 1][w - weight] + value 
//         )
//       } else {
//         dp[i][w] = dp[i - 1][w];
//       }
//     }
//   }
//     console.log("result: ", dp)
//   return dp;
// }

// function getItems(dp, weights, W) {
//   let i = weights.length;
//   let w = W;
//   const items = [];

//   while (i > 0 && w > 0) {
//     if (dp[i][w] !== dp[i - 1][w]) {
//       items.push(i); 
//       w -= weights[i - 1];
//     }
//     i--;
//   }

//   return items.reverse();
// }


// const values = [5,7,2,8,5,3];
// const weights = [6,2,1,2,3,6];
// const weight = 10;
// // const dp = knapsack(weights, values, weight)
// // console.log(getItems(dp,  weights, weight));
