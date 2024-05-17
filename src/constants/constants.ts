import { Player } from "../player";

export let MAX_SYMBOL_SIZE = 1

export function setMaxSymbolSize(players: Player[]) {
  MAX_SYMBOL_SIZE = Math.max(...players.map(p => p.symbol.length))
}