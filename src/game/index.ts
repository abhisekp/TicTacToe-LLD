import { Player } from "../player";
import { Board } from "../board";
import { Status } from "../constants/status";
import { Target } from "../types";

export class Game {
  private players: Player[];
  private board: Board;
  private status: Status = Status.NOT_PLAYING;
  private currPlayerIdx: number = -1;

  constructor({ players, boardSize = 3 }: { players: Player[]; boardSize?: number }) {
    if (boardSize < 3) {
      throw new Error("Board size must be at least 3 rows and columns.");
    }

    this.players = players;
    this.board = new Board(boardSize);

    this.printPlayerInfo();
  }

  printPlayerInfo() {
    for (const player of this.players) {
      console.log(player.getInfo());
    }
  }


  play(targets: Target[]) {
    this.status = Status.PLAYING;

    for (let currTargetIdx = 0; this.status == Status.PLAYING && currTargetIdx < targets.length; currTargetIdx++) {
      this.currPlayerIdx = (this.currPlayerIdx + 1) % this.players.length;
      const currPlayer = this.players[this.currPlayerIdx];
      const currTarget = targets[currTargetIdx];

      console.log(`Current ${currPlayer.getInfo()} moves [${currTarget[0]}, ${currTarget[1]}]`);

      this.status = currPlayer.move(this.board, currTarget);
    }

    if (this.status == Status.DRAW) {
      console.log("All players drawed.");
      this.printPlayerInfo();
    } else if (this.status == Status.WINNER) {
      console.log(`Winner ${this.players[this.currPlayerIdx].getInfo()}`);
    } else {
      console.log("All players quit.");
    }
  }
}