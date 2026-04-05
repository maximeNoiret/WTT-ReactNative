export const calculatePoints = (timeLeft: number, totalTime: number): number => {
  const delayInitial = 3;
  const timeElapsed = totalTime - timeLeft;
  if (timeElapsed <= delayInitial) return 1000;
  const penalty = Math.floor((timeElapsed - delayInitial) * 50);
  const finalScore = 1000 - penalty;
  return finalScore < 100 ? 100 : finalScore;
};