import { Status } from "../constants/status";
import { InvalidMove } from "../errors";
import { Player } from "../player";
import { Target } from "../types";
import { MAX_SYMBOL_SIZE } from "../constants/constants";


export class Board {
  private cells: Player[][];

  private moves: [Player, Target][] = [];

  constructor(boardSize: number) {
    this.cells = Array.from({ length: boardSize }, () => Array.from({ length: boardSize }));
    this.printBoard()
  }

  public move(player: Player, target: Target): Status {
    if (this.isTaken(target)) {
      const takenPlayer = this.getCell(target);
      throw new InvalidMove(`Target is already taken by ${takenPlayer.name} [${takenPlayer.symbol}]`);
    }

    this.setCell(player, target);
    this.moves.push([player, target]);
    this.printBoard()

    if (this.checkWinningMove(player, target)) {
      return Status.WINNER;
    }

    if (this.moves.length === this.cells.length ** 2) {
      return Status.DRAW;
    }

    return Status.PLAYING;
  }

  private getCell(target: Target): Player {
    return this.cells[target[0]][target[1]];
  }

  private setCell(player: Player, target: Target) {
    this.cells[target[0]][target[1]] = player;
  }

  private isTaken(target: Target): boolean {
    return this.getCell(target) != null;
  }

  private checkWinningMove(currPlayer: Player, target: Target): boolean {
    let columnWinner = true;
    let rowWinner = true;
    let diagWinner = true;
    let revDiagWinner = true;

    for (let i = 0; i < this.cells.length; i++) {
      // Check the columns
      if (columnWinner && this.getCell([target[0], i]) !== currPlayer) {
        columnWinner = false;
      }

      // Check the rows
      if (rowWinner && this.getCell([i, target[1]]) !== currPlayer) {
        rowWinner = false;
      }

      // Check Diagonal
      if (diagWinner && this.getCell([i, i]) !== currPlayer) {
        diagWinner = false;
      }

      // Check Reverse Diagonal
      if (revDiagWinner && this.getCell([i, this.cells.length - 1 - i]) !== currPlayer) {
        revDiagWinner = false;
      }

    }

    let isWinner = columnWinner || rowWinner || diagWinner || revDiagWinner;

    return isWinner;
  }

  printBoard() {
    let boardGrid = ""
    for (const cell of this.cells) {
      boardGrid += cell.map(p => p?.symbol?.padStart(MAX_SYMBOL_SIZE, " ") || "_".padStart(MAX_SYMBOL_SIZE, "_")).join(' | ')
      boardGrid += "\n"
    }
    console.log(boardGrid)
  }
}