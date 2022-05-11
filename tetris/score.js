import { prop } from './util';

export const Score = class {
  constructor(stage, listener) {
    prop(this, { stage, listener });
  }
  clear() {
    this.score = this.total = 0;
  }
  add(line) {
    const score = this.stage.score(line);
    this.score += score;
    this.total += score;
    this.listener();
  }
  [Symbol.toPrimitive](h) {
    return `${this.curr},${this.total}`;
  }
};
