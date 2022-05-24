import { TemplateMethodPattern } from './template-method-pattern.js';
import { HOOK, prop } from './utils/index.js';

export const Stage = class extends TemplateMethodPattern {
  constructor(last, minSpeed, maxSpeed, listener) {
    super(listener);
    prop(this, { last, minSpeed, maxSpeed, listener });
  }
  [HOOK(TemplateMethodPattern, 'clear')]() {
    this.stage = 0;
    this.next();
  }
  _speed() {
    const rate = (this.stage - 1) / (this.last - 1);
    this.speed = this.minSpeed + (this.maxSpeed - this.minSpeed) * (1 - rate);
    // this.speed = 500 - (450 * this.stage) / this.last;
  }
  _count() {
    this.count = 10 + 3 * this.stage;
  }
  next() {
    if (this.stage++ < this.last) {
      this._speed();
      this._count();
      this.notify();
    }
  }
  // score(line) {
  //   return parseInt(this.stage * 5 * 2 ** line);
  // }
  [Symbol.toPrimitive]() {
    return this.stage;
  }
};
