import { Target } from "../types";
import { Board } from "../board";
import { Status } from "../constants/status";

export class Player {
  constructor(public name: string, public symbol: string) {
    if (!name) {
      throw new Error("Please provide a valid player name");
    }
    if (!symbol) {
      throw new Error("Please provide a valid symbol for the player");
    }
  }

  getInfo(): string {
    return `Player ${this.name} [${this.symbol}]`;
  }

  move(board: Board, target: Target): Status {
    return board.move(this, target)
  }

}
