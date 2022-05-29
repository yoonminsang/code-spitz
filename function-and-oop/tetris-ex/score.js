import { TemplateMethodPattern } from './template-method-pattern.js';
import { HOOK, prop } from './utils/index.js';

export const Score = class extends TemplateMethodPattern {
  constructor(stage, listener) {
    super(listener);
    prop(this, { stage, listener });
  }
  [HOOK(TemplateMethodPattern, 'clear')]() {
    this.curr = this.total = 0;
  }
  add(line) {
    // const score = this.stage.score(line);
    const score = parseInt(this.stage * 5 * 2 ** line);
    this.curr += score;
    this.total += score;
    this.notify();
  }
  // [Symbol.toPrimitive]() {
  //   return `${this.curr},${this.total}`;
  // }
};
