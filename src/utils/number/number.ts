export const isPrimeNumber = (target: number) => {
  if (target === 1) return false;

  const targetSquareRoot = Math.sqrt(target);

  for (let i = 2; i <= targetSquareRoot; i++) {
    if (target % i === 0) return false;
  }

  return true;
};
