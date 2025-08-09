const DATA = {
  ranked: [
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 50,
    40, 40, 20, 10,
  ],

  player: [5, 25, 50, 120],
};
function climbingLeaderboard(ranked: number[], player: number[]): number[] {
  const rankingSet = Array.from(new Set([...ranked, ...player])).sort(
    (a, b) => b - a,
  );
  return player.map(p => rankingSet.findIndex(r => p === r) + 1);
}

export function main() {
  console.log(climbingLeaderboard(DATA.ranked, DATA.player));
}
