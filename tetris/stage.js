import { prop } from './util';

const Stage = class {
  constructor(last, min, max, listener) {
    prop(this, { last, min, max, listener });
  }
  clear() {
    this.stage = 0;
    this.next();
  }
  _speed() {
    const rate = (this.stage - 1) / (this.last - 1);
    this.speed = this.min + (this.max - this.min) * (1 - rate);
    // this.speed = 500 - (450 * this.stage) / this.last;
  }
  _count() {
    this.count = 10 + 3 * this.stage;
  }
  next() {
    if (this.stage++ < this.last) {
      this._speed();
      this.listener();
    }
  }
  score(line) {
    return parseInt(this.stage * 5 * 2 ** line);
  }
  [Symbol.toPrimitive](h) {
    return this.stage;
  }
};
