import { Game } from "./game";
import { Player } from "./player";
import { Target } from "./types";

(function run() {
  const players = [
    new Player("Abhisek", "X"),
    new Player("Chandni", "O")
  ];

  const game = new Game({
    players: players
  });

  const targets = genTargets(players);
  // console.log({ targets });
  game.play(targets);
})();

function genTargets(players: Player[]): Target[] {
  // @ts-ignore
  const plays: string[][] = [
    ["1 X", "", "5 X"],
    ["7 X", "3 X", "2 O"],
    ["6 O", "8 O", "4 O"]
  ];

  /*
  [
    [0, 0],
    [1, 2],
    [1, 1],
    [2, 2],
    [0, 2],
    [2, 0],
    [2, 1],
    [0, 1],
    [1, 0]
  ]
  */


  const playerSymbols = players.reduce((playSymbolMap, player) => {
    playSymbolMap[player.symbol] = player;
    return playSymbolMap;
  }, {} as { [key: string]: Player });

  const targetsList = plays.reduce((targetMap, playSymbols, i) => {
      playSymbols.forEach((ps, j) => {
        const reMovePlayer = /(?<move>\d+)\s*(?<symbol>\D+)/g;
        const { move, symbol } = reMovePlayer.exec(ps)?.groups || {};
        // console.log("Found:", move, symbol, playerSymbols[symbol]);

        if (!move || !symbol || !playerSymbols[symbol]) {
          // console.log("Not Found:", { move, symbol, player: playerSymbols[symbol] });
          return;
        }

        targetMap.push({
          target: [i, j],
          move: Number(move) - 1,
          player: playerSymbols[symbol]
        });
      });

      return targetMap;
    }, [] as {
      target: Target;
      move: number;
      player: Player;
    }[]
  );

  targetsList.sort((target1, target2) => target1.move - target2.move);

  // console.log(plays, playerSymbols, targetsList);

  const validateMoves = () => {
    let startPlayerIdx = players.findIndex(p => p === targetsList[0].player);
    // console.log(startPlayerIdx, players[startPlayerIdx])
    return targetsList.every((t, i) => {
      const nextPlayer = players[startPlayerIdx]
      const isValid = t.player === nextPlayer;
      if (!isValid) {
        console.log(`Move ${t.move + 1} should be move for Player ${nextPlayer.name} [${nextPlayer.symbol}]`)
      }
      // console.log({ isValid, player: t.player})
      startPlayerIdx = (startPlayerIdx + 1) % players.length;
      return isValid;
    });
  };

  if (!validateMoves()) {
    throw new Error("Invalid moves.");
  }

  return targetsList.map(target => target.target);

}