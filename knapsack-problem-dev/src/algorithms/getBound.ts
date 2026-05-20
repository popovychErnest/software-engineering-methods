function getBound(
  i: number,
  W: number,
  currentValue: number,
  weights: number[],
  values: number[]
) {
  let bound = currentValue;
  let remaining = W;

  while (i < weights.length && weights[i] <= remaining) {
    remaining -= weights[i];
    bound += values[i];
    i++;
  }

  if (i < weights.length) {
    bound += values[i] * (remaining / weights[i]);
  }

  return bound;
}
export default getBound;