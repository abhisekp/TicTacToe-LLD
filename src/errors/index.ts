export class InvalidMove extends Error {
  // @ts-ignore
  constructor(msg?: string) {
    super(`Invalid Move: ${msg}` );
  }
}