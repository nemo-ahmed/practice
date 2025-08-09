"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const DATA = {
    ranked: [
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 50,
        40, 40, 20, 10,
    ],
    player: [5, 25, 50, 120],
};
function climbingLeaderboard(ranked, player) {
    const rankingSet = Array.from(new Set([...ranked, ...player])).sort((a, b) => b - a);
    console.log(rankingSet);
    return player.map(p => rankingSet.findIndex(r => p === r) + 1);
}
function main() {
    console.log(climbingLeaderboard(DATA.ranked, DATA.player));
}
