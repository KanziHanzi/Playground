export const isPrimeNumber = (target: number) => {
  for (let i = 2; i < target; i++) {
    if (target % i === 0) return false;

    if (i === target - 1) { // return true if all numbers are tested except for the value itself
      return true;
    }
  }
};
