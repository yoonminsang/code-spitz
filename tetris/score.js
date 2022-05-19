import { prop } from './utils';

export const Score = class {
  constructor(stage, listener) {
    prop(this, { stage, listener });
  }
  clear() {
    this.score = this.total = 0;
  }
  add(line) {
    const score = parseInt(this.stage * 5 * 2 ** line);
    this.score += score;
    this.total += score;
    this.listener();
  }
  [Symbol.toPrimitive]() {
    return `${this.score},${this.total}`;
  }
};
