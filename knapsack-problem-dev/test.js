function knapsack(weights, values, W) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(W + 1).fill(0)
  );
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      const weight = weights[i - 1];
      const value = values[i - 1];
      if (weight <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],                  
          dp[i - 1][w - weight] + value 
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
    console.log("result: ", dp)
  return dp;
}

function getItems(dp, weights, W) {
  let i = weights.length;
  let w = W;
  const items = [];

  while (i > 0 && w > 0) {
    if (dp[i][w] !== dp[i - 1][w]) {
      items.push(i); 
      w -= weights[i - 1];
    }
    i--;
  }

  return items.reverse();
}


const values = [5,7,2,8,5,3];
const weights = [6,2,1,2,3,6];
const weight = 10;
// const dp = knapsack(weights, values, weight)
// console.log(getItems(dp,  weights, weight));



const valuesString = '[5    ,7,   ,2,8,5,   3]';

console.log(valuesString.slice(1, valuesString.length - 1))
const splitValues =  (valuesString.slice(1, valuesString.length - 1)).split(",").map(el => Number(el));
console.log(splitValues);

console.log()





