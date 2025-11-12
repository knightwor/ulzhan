export function calculateScore(time: number, mistakes: number) {
  return Math.max(1000 - time * 5 - mistakes * 20, 0);
}
